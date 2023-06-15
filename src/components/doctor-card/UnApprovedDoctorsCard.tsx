import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { Props } from "./ApprovedDoctorsCard";
import { IdoctorData } from "../../pages/doctors/approved-doctors/ApprovedDoctorList";
import axios from "axios";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
const UnApprovedDoctorsCard: React.FC<Props & IdoctorData> = ({
  mt,
  Id,
  Name,
  MobileNumber,
  Password,
  Isapproved,
  IsEnabled,
  Email,
  DoctorType,
  PMDC,
  ValidUpto,
  renderList
}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataTobeSent = [
      {
        op: "replace",
        path: "Isapproved",
        value: "true",
      },
    ];
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/Doctor/notapproved/${Id}`,
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
      } else if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <>
      <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Doctor approved successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
      />
      <IonCard
        style={{ marginTop: `${mt ? 0 : null}`, marginInline: 0 }}
        className="md hydrated"
      >
        <IonItem className="item md ion-focusable item-label hydrated">
          <IonLabel className="sc-IonLabel-md-h sc-IonLabel-md-s md hydrated">
            <b>{Name}</b>
          </IonLabel>
          <form action="" onClick={handleSubmit}>
            <IonButton
              color="tertiary"
              fill="outline"
              size="small"
              slot="end"
              className="ion-color ion-color-tertiary md button button-small button-outline ion-activatable ion-focusable hydrated"
            >
              {" "}
              Approve &nbsp;{" "}
            </IonButton>
          </form>
        </IonItem>
        <IonCardContent className="md card-content-md hydrated">
          <p>Email: {Email}</p>
          <p>Number: {MobileNumber}</p>
          <p>PMDC No: {PMDC}</p>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default UnApprovedDoctorsCard;
