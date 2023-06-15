import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  useIonRouter,
  IonButton,
  IonCheckbox,
} from "@ionic/react";
import HeaderButtons from "../../components/HeaderButtons";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import AlertSuccess from "../../components/alerts/AlertError";
import AlertError from "../../components/alerts/AlertError";
interface IParam {
  location: {
    search: string;
  };
  match: {
    params: {
      vaccineId: number;
    };
  };
}
const EditVaccine: React.FC<IParam> = ({
  location: { search },
  match: {
    params: { vaccineId },
  },
}) => {
  const router = useIonRouter();
  const [showLoading, setShowLoading] = useState(false);
  //extracting data from url
  const [VaccineName, VaccineIsSpeical, VaccineInfinite] = search
    .substring(1)
    .split("&")
    .map((item) => item.split("=")[1]);

  // initial values;
  let initialIsSpeical =
    VaccineIsSpeical === "true" ? true : "false" ? false : true;
  let initialInfinite =
    VaccineInfinite === "true" ? true : "false" ? false : true;
  //states variable for saving data from form
  const [Name, setName] = useState(VaccineName);
  const [IsSpecial, setIsSpeical] = useState(initialIsSpeical);
  const [Infinite, setInfinite] = useState(initialIsSpeical);
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoading(true);
    const dataTobeSent = { id: vaccineId, Name, IsSpecial, Infinite };
    const url = `${import.meta.env.VITE_API_URL}api/Vaccine?id=${vaccineId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      });
      if (response.ok) {
        setSuccess(true);
      } else if (!response.ok) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setShowLoading(false);
      setName("");
      setIsSpeical(false);
      setInfinite(false);
    }
  };

  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={3000}
      />
      <IonPage>
        <AlertSuccess
          isOpen={success}
          setOpen={setSuccess}
          message="Vaccine Updated successfully"
        />
        <AlertError
          isOpen={error}
          setOpen={setError}
          message="An Error occcured. Plz try again."
        />
        <HeaderButtons pageName="Update Vaccine"></HeaderButtons>
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
            <IonItem>
              <IonLabel color="primary">Is-Special</IonLabel>
              <IonCheckbox
                value={IsSpecial}
                checked={IsSpecial}
                placeholder="Select One"
                onIonChange={(e) => setIsSpeical(e.detail.checked)}
                slot="end"
              ></IonCheckbox>
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Infinite</IonLabel>
              <IonCheckbox
                value={Infinite}
                checked={Infinite}
                placeholder="Select One"
                onIonChange={(e) => setInfinite(e.detail.checked)}
                slot="end"
              ></IonCheckbox>
            </IonItem>
            <IonButton
              type="submit"
              fill="solid"
              color="primary"
              slot="start"
              expand="full"
              strong
            >
              Update Vaccine
            </IonButton>
            <IonButton
              fill="solid"
              color="primary"
              slot="start"
              expand="full"
              strong
              onClick={() => router.push("/members/vaccine", "root")}
            >
              Vaccine List
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditVaccine;
