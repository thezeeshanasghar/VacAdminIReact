import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonAlert,
  useIonRouter,
} from "@ionic/react";
import HeaderButtons from "../../components/HeaderButtons";
import AlertError from "../../components/alerts/AlertError";
import AlertSuccess from "../../components/alerts/AlertSuccess";
export interface IhistoryObjectProps {
  history: {
    push: (path: string, search: string) => void;
    replace: (path: string, search: string) => void;
    go: (path: string, search: string) => void;
    goBack: (path: string, search: string) => void;
    goForward: (path: string, search: string) => void;
  };
}
const AddVaccine: React.FC<IhistoryObjectProps> = ({ history }) => {
  const [Name, setName] = useState("");
  const [IsSpecial, setIsSpecial] = useState<boolean>(false);
  const [Infinite, setInfinite] = useState<boolean>(false);
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //router object
  const router = useIonRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataTobeSent = { Name, IsSpecial, Infinite };
    const url = `${import.meta.env.VITE_API_URL}api/Vaccine`;
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
        router.push("/members/vaccine")
      } else if (response.status !== 201) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setName("");
      setIsSpecial(false);
      setInfinite(false);
    }
  };
  const canSubmit=Name.length>0;
  return (
    <IonPage>
      <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Vaccine added successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
      />
      <HeaderButtons pageName="Add Vaccine"></HeaderButtons>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel color="primary">Name</IonLabel>
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
              aria-label="isspecial"
              value={IsSpecial}
              checked={IsSpecial}
              placeholder="Select One"
              onIonChange={(e) => setIsSpecial(e.detail.checked)}
              slot="end"
            ></IonCheckbox>
          </IonItem>

          <IonItem>
            <IonLabel color="primary">Infinite</IonLabel>
            <IonCheckbox
              aria-label="infinite"
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
            expand="block"
            color="primary"
            slot="start"
            disabled={!canSubmit}
          >
            Add Vaccine
          </IonButton>
          <IonButton
            fill="solid"
            onClick={() => router.push("/members/vaccine", "root")}
            expand="block"
            color="primary"
            slot="start"
          >
            Vaccine List
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddVaccine;
