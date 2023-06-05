import { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import "../success-alert.css";
import "../error-alert.css";
import HeaderButtons from "../../../components/HeaderButtons";
import React from "react";
import { VaccineIdProps } from "./VaccineBrandCardList";
import { IhistoryObjectProps } from "../AddVaccine";
import AlertError from "../../../components/alerts/AlertError";
import AlertSuccess from "../../../components/alerts/AlertSuccess";
const AddBrands: React.FC<VaccineIdProps & IhistoryObjectProps> = ({
  match: {
    params: { vaccineId },
  },
  history: { goBack },
}) => {
  const router = useIonRouter();
  //state variable to store brandName
  const [Name, setName] = useState("");
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Name : ", Name, "  Type of Name : ", typeof Name);
    event.preventDefault();
    const dataTobeSent = { Name, vaccineId };
    const url = "https://myapi.fernflowers.com/api/brand";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      });
      if (response.status === 201) {
        setSuccess(true);
      } else if (response.status !== 201) setError(true);
    } catch (err) {
      setError(true);
      
    } finally {
      setName("");
    }
  };

  return (
    <IonPage>
      <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Brand added successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
      />
      <HeaderButtons pageName="Add Brand"></HeaderButtons>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel color="primary" position="floating">
              Name
            </IonLabel>
            <IonInput
              type="text"
              
              value={Name}
              //@ts-ignore
              onIonChange={(e) => setName(e.detail.value)}
            ></IonInput>
          </IonItem>

          <IonButton
            type="submit"
            fill="solid"
            color="primary"
            slot="start"
            expand="full"
            strong
          >
            add brand
          </IonButton>
          <IonButton
            fill="solid"
            color="primary"
            slot="start"
            expand="full"
            strong
            onClick={() => goBack(`/members/vaccine/${vaccineId}/brands`, "")}
          >
            Brand List
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddBrands;

