import React, { useState } from "react";
import {
  IonDatetime,
  IonIcon,
  // IonItem,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { calendar } from "ionicons/icons";

import AlertError from "../alerts/AlertError";
import AlertSuccess from "../alerts/AlertSuccess";
import { format } from "date-fns";
import Toast from "../Custom Toast/Toast";

interface IDoseSchedule {
  Id: number;
  date: string;
  Name: string;
  MinAge: number;
  VaccineId: number;
  renderList: () => void;
}

const Schedulecard: React.FC<IDoseSchedule> = ({
  Name,
  Id,
  date,
  renderList,
}) => {
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date); // Initialize with the `date` prop value

  const [success, setSuccess] = useState(false);
  const handelonmouseover = (inputValue: string) => {
    // const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");

    setSelectedDate(data2);
  };
  const handleDateChange = async (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;
    console.log(selectedValue);
    const dataTobeSent = {
      date: selectedValue,
      doseId: Id,
    };
    console.log(dataTobeSent);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/AdminSchedule/Admin_single_updateDate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.ok) {
        setSuccess(true);
        renderList();
        setShowPopover(false);
      } else {
        setError(true);
        renderList();
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowPopover(false);
    }
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  return (
    <>
     <Toast
          isOpen={success}
          setOpen={setSuccess}
          message="Single date of admin schedule update successfully."
          color="success"
        />
        <Toast
          isOpen={error}
          setOpen={setError}
          message="An error occurred while update single date of admin schedule. plz try again"
          color="danger"
        />
      {/* <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Selected dose date updated successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occurred. Please try again."
      /> */}
      <IonGrid>
        <IonRow>
          <IonCol>
            <b>{Name}</b>
          </IonCol>
          <IonCol size="auto">
            <>
              <IonIcon
                color="primary"
                onClick={() => setShowPopover(true)}
                icon={calendar}
                style={{ marginRight: "10px", cursor: "pointer" }}
                onMouseOver={() => handelonmouseover(date)}
              />
            </>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
        <IonDatetime
          placeholder="Select Date"
          value={selectedDate}
          onIonChange={handleDateChange}
        ></IonDatetime>
      </IonPopover>
    </>
  );
};

export default Schedulecard;
