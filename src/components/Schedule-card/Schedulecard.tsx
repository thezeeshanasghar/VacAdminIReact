import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonPopover,
  IonText,
} from "@ionic/react";
import { format } from "date-fns";
import { calendar } from "ionicons/icons";
import { enUS } from "date-fns/locale";
interface IDoseSchedule {
  Id: number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
  DoseDate: string
  cardDate: string;
}

const Schedulecard: React.FC<IDoseSchedule> = ({ Name, DoseDate ,Id, cardDate }) => {
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  // const handleDateChange = (event: CustomEvent) => {
  //   setSelectedDate(event.detail.value);
  //   closePopover();
  // };
  // console.log('yeeeeeeeeeeeeeeeeeeeeeeessss card date', cardDate)
  const handleDateChange = (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;
    console.log(selectedValue);
    const data=selectedValue.split('T');
    const data1=data[0];
    console.log(data1);

      // setSelectedDate(selectedValue);
      // setShowDatePicker(false);
      // if (inputRef.current) {
      //   inputRef.current.setFocus();
      // }
      const dataTobeSent = {
        
    date: selectedValue,
    doseId: Id
      };
      console.log(dataTobeSent)
      fetch(`http://localhost:5041/api/AdminDoseSchedule/Admin_single_updateDate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
       
      })
        .then((response) => {
          // if (response.status === 204) renderList();
        })
        .catch((err) => {
          setError(true);
        });
  };
  
  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };
  // console.log(selectedDate)
  return (
    <>
      <IonItem>
        {Name}
        </IonItem>
        <IonItem slot="end" lines="none"  style={{ padding: 0 }}>
          <IonItem>
            <IonIcon color="primary" onClick={() => setShowPopover(true)} icon={calendar} />
            <input
            style={{border:"none"}}
              type="date"
              readOnly
              value={format(new Date(DoseDate), "yyyy-MM-dd")}
            />
          </IonItem>
          <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
            <IonDatetime
              // displayFormat="MMM DD, YYYY"
              placeholder="Select Date"
              value={selectedDate || undefined}
              onIonChange={handleDateChange}
            ></IonDatetime>
          </IonPopover>
        </IonItem>
      
    </>
  );
};

export default Schedulecard;
