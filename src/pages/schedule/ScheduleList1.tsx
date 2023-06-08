import React, { useEffect, useState } from 'react';
import { IonCard, IonContent, IonDatetime, IonIcon, IonItem, IonLabel, IonPage, IonPopover } from '@ionic/react';
import { groupBy } from 'lodash';
import Schedulecard from "../../components/Schedule-card/Schedulecard";
import HeaderButtons from '../../components/HeaderButtons';
import AlertError from '../../components/alerts/AlertError';
import AlertSuccess from '../../components/alerts/AlertSuccess';
import { calendar } from 'ionicons/icons';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

interface IDoseSchedule {
  Id: number;
  Date: string;
  DoseId: number;
  Dose: {
    Id: number;
    Name: string;
    MinAge: number;
    MinGap: number;
    VaccineId: number;
    DoseDate: string;
  };
}

interface TGroupData {
  key: string;
  value: IDoseSchedule[];
}

const ScheduleList1: React.FC = () => {
  const [data, setData] = useState<IDoseSchedule[]>([]);
  const [groupedData, setGroupedData] = useState<TGroupData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const forceRender = () => {
    fetchDoseData();
  };
  useEffect(() => {
    fetchDoseData();
  }, []);

  const fetchDoseData = async () => {
    try {
      const response = await fetch('http://localhost:5041/api/AdminDoseSchedule');
      if (response.ok) {
        const data = await response.json();

        setData(data);

        const groupedData = groupBy(data, (item) => {
          const date = new Date(item.Date);
          return date.toISOString().split('T')[0];
        });

        const groupArray = Object.entries(groupedData).map(([key, value]) => ({
          key,
          value,
        }));

        setGroupedData(groupArray);
        setIsLoading(false);
      } else {
        console.log('Error fetching data');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };
  function handelonmouseover(inputValue: string){
    const data1=inputValue.split('T');
    const data2=data1[0];
    console.log(data2)
    setValue(data2)
   }
  const handleDateChange =async (event: CustomEvent,key: string,inputValue: string ) => {
    console.log(value)
    // console.log(setInputValue(event.detail.value));
    
    console.log(selectedDate);
    // setSelectedDate(event.detail.value);
    closePopover();
    // const previousDate = objectItem.key; // Get the previous date from the objectItem
    // console.log('Previous Date:', previousDate);
    const data=event.detail.value
    const data1=data.split('T');
    const data2=data1[0];
    console.log(data2);
   
    console.log(event.detail.value);
    const data3='2028-06-05';
    const dataTobeSent = [
      {
      path:"Date",
      op:"replace",
      from:value,
      value:data2,
    }
  ];

    console.log("object item date : ", dataTobeSent );
    try{
      const response = await fetch(`http://localhost:5041/api/AdminDoseSchedule/Admin_bulk_updateDate/${value}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      }
    )
    if (response.ok) {
      console.log(response.ok)
      setSuccess(true);
      setRenderList(true);
    } else if (!response.ok) {
      setError(true);
    }
    }catch (error) {
      console.error(error);
      setError(true);
    }
    // UpdateExpiryDateOfDoctor(event.detail.value);
  };
  
  const openPopover = () => {
    setShowPopover(true);
  };
  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <>
    <AlertSuccess
    isOpen={success}
    setOpen={setSuccess}
    message="Selected dose date updated successfully"
  />
  <AlertError
    isOpen={error}
    setOpen={setError}
    message="An Error occcured. Plz try again."
  />
    <IonPage>
       <HeaderButtons
          pageName="Dose Schedule"
          Showbutton={false}
          url="/members/schedule"
        />
     
    <IonContent className="ion-padding">
      {isLoading ? (
         <LoadingSpinner
         isOpen={showLoading}
         setOpen={setShowLoading}
         time={5000}
       />
      ) : groupedData.length === 0 ? (
        <p>No data available</p>
      ) : (
        groupedData.map((group) => (
          <React.Fragment key={group.key}>
            {/* <h3>{group.key}</h3> */}
            
            
                <IonCard>
                  <IonItem lines="none" className="centered-item">
                    <IonLabel style={{ textAlign: "center" }}>
                      <IonItem
                        lines="none"
                        slot="center"
                        style={{ textAlign: "center", padding: 0 }}
                      >
                        <IonIcon
                        color="primary"
                          onClick={() => setShowPopover(true)}
                          icon={calendar}
                          onMouseOver={(e) => handelonmouseover(group.key)}
                        />
                        <input
                          style={{ border: "none" }}
                          type="date"
                          readOnly
                          value={group.key}
                         
                        />
                        <IonPopover
                          isOpen={showPopover}
                          onDidDismiss={closePopover}
                        >
                          <IonDatetime
                            // displayFormat="MMM DD, YYYY"
                            placeholder="Select Date"
                            value={group.key|| undefined}
                            onIonChange={(e) => handleDateChange(e, group.key,inputValue)}
                          ></IonDatetime>
                        </IonPopover>
                      </IonItem>
                    </IonLabel>
                  </IonItem>
              {group.value.map((item: IDoseSchedule, itemIndex: number) => (
                <IonItem key={itemIndex}>
                  <Schedulecard
                    Id={item.Id}
                    Name={item.Dose.Name}
                    MinAge={item.Dose.MinAge}
                    MinGap={item.Dose.MinGap}
                    VaccineId={item.Dose.VaccineId}
                    DoseDate={item.Dose.DoseDate}
                    cardDate={group.key}
                    renderList={ forceRender}
                  />
                </IonItem>
              ))}
            </IonCard>
          </React.Fragment>
        ))
      )}
    </IonContent>
    </IonPage>
    </>
  );
};

export default ScheduleList1;