import {
  IonCard,
  IonContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
} from "@ionic/react";
import React, { useEffect, useState, useRef } from "react";
import HeaderButtons from "../../components/HeaderButtons";
import Schedulecard from "../../components/Schedule-card/Schedulecard";
import { groupBy } from "lodash";
import { calendar } from "ionicons/icons";
import { format } from "date-fns";

interface IDoseSchedule {
  Id: number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
  DoseDate: string;
}

interface TGroupData {
  key: string;
  value: IDoseSchedule[];
}

const ScheduleList: React.FC = () => {
  const [data, setData] = useState<IDoseSchedule[]>([]);
  const [groupedData, setGroupData] = useState<TGroupData[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  // const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<string>("");
  const handleIconClick = () => {
    setShowDatePicker(true);
  };
 

  useEffect(() => {
    fetchVaccineData();
  }, [location]);
  const fetchVaccineData = async () => {
    // setShowLoading(true);/
    fetch(`http://localhost:5041/doseschedule_date`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  const handleDateChange = (event: CustomEvent,key: string ) => {
    console.log(setInputValue(event.detail.value));
    console.log(selectedDate);
    setSelectedDate(event.detail.value);
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
      from:data3,
      value:data2,
    }
  ];
    console.log("object item date : ", dataTobeSent );
    fetch(`http://localhost:5041/api/AdminDoseSchedule/Admin_bulk_updateDate/${data3}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      }
    )
      .then((response) => {
        // if (response.status === 204) renderList();
      })
      .catch((err) => {
        setError(true);
      });
    // UpdateExpiryDateOfDoctor(event.detail.value);
  };
  useEffect(() => {
    const savedValue = localStorage.getItem('inputValue');
    const groupedData = groupBy(data, (item) => {
      const date = new Date(item.DoseDate);
      return date.toISOString().split("T")[0];
    });
    console.log("groupedData", groupedData);
    const groupArray = [];
    for (const key in groupedData) {
      if (Object.prototype.hasOwnProperty.call(groupedData, key)) {
        const element = groupedData[key];
        groupArray.push({ key, value: element });
      }
    }
    console.log("groupArray", [...groupArray]);
    setGroupData(groupArray);
  }, [data]);
  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };
  return (
    <IonPage>
       <HeaderButtons
          pageName="Dose Schedule"
          Showbutton={true}
          url="/members/schedule"
        />
      <IonContent className="ion-padding">
        {data &&
          groupedData.map((objectItem: any, index: number) => {
            const ourdate = objectItem.value.DoseDate;
            // console.log(ourdate)
            const array = objectItem.value;
            return (
              <React.Fragment key={index}>
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
                        />
                        <input
                          style={{ border: "none" }}
                          type="date"
                          readOnly
                          value={objectItem.key}
                        />
                        <IonPopover
                          isOpen={showPopover}
                          onDidDismiss={closePopover}
                        >
                          <IonDatetime
                            // displayFormat="MMM DD, YYYY"
                            placeholder="Select Date"
                            value={inputValue|| undefined}
                            onIonChange={(e) => handleDateChange(e, objectItem.key)}
                          ></IonDatetime>
                        </IonPopover>
                      </IonItem>
                    </IonLabel>
                  </IonItem>
                  {array.map((item: any, itemIndex: number) => (
                    <IonItem key={itemIndex}>
                      <Schedulecard
                        Id={item.Id}
                        Name={item.Name}
                        MinAge={item.MinAge}
                        MinGap={item.MinGap}
                        VaccineId={item.VaccineId}
                        DoseDate={item.DoseDate}
                        cardDate={ourdate}
                      />
                    </IonItem>
                  ))}
                  </IonCard>
             </React.Fragment>
              
            );
          })}
          
         </IonContent>
         </IonPage>

  );
};
export default ScheduleList;
function fetchOtherSourceData() {
  throw new Error("Function not implemented.");
}

