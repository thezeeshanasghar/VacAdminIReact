import React, { useState } from "react";
import {
  IonDatetime,
  IonIcon,
  IonItem,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { format } from "date-fns";
import { calendar } from "ionicons/icons";

import AlertError from "../alerts/AlertError";
import AlertSuccess from "../alerts/AlertSuccess";

interface IDoseSchedule {
  Id: number;
  DId:number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
  DoseDate: string;
  cardDate: string;
  renderList: () => void;
}

const Schedulecard: React.FC<IDoseSchedule> = ({
  Name,
  DoseDate,
  Id,
  cardDate,
  DId,
  renderList,
}) => {
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [success, setSuccess] = useState(false);

  function handelonmouseover(inputValue: string) {
    const data1 = inputValue.split("T");
    const data2 = data1[0];
    console.log(data2);
    setSelectedDate(data2);
  }
  const handleDateChange = async (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;

    // console.log(data1);
    const dataTobeSent = {
      date: selectedValue,
      doseId: DId,
    };
    console.log(dataTobeSent);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/AdminDoseSchedule/Admin_single_updateDate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.ok) {
        console.log(response.ok);
        setSuccess(true);
        renderList();
        setShowPopover(false);
      } else if (!response.ok) {
        setError(true);
        renderList();
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowPopover(false);
    }
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
        message="An Error occurred. Please try again."
      />
      <IonGrid>
        <IonRow>
          <IonCol>
            <>{Name}</>
          </IonCol>
          <IonCol size="auto">
            <>
              <IonIcon
                color="primary"
                onClick={() => setShowPopover(true)}
                icon={calendar}
                onMouseOver={(e) => handelonmouseover(DoseDate)}
              />
              {/* <input
                style={{ border: "none" }}
                type="date"
                readOnly
                value={DoseDate ? format(new Date(DoseDate), "yyyy-MM-dd") : ""}
              /> */}
            </>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
        <IonDatetime
          placeholder="Select Date"
          value={selectedDate || undefined}
          onIonChange={handleDateChange}
        ></IonDatetime>
      </IonPopover>
    </>
  );
};

export default Schedulecard;
