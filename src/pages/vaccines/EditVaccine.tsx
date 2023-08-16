import React, { useEffect, useState } from "react";
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
import Toast from "../../components/Custom Toast/Toast";

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

  useEffect(()=> {
    // Extracting data from the URL
  const searchParams = new URLSearchParams(search);
  const VaccineName = searchParams.get("vaccineName")
  const VaccineIsSpecial = searchParams.get("IsSpecial");
  const VaccineInfinite = searchParams.get("Infinite");

  // Initial values
  const initialIsSpecial = VaccineIsSpecial === "true";
  const initialInfinite = VaccineInfinite === "true";
  //@ts-ignore
  VaccineName && setName(VaccineName);
  setIsSpecial(initialIsSpecial)
  setInfinite(initialInfinite)
  },[search])


  // States for saving form data
  const [Name, setName] = useState("");
  const [IsSpecial, setIsSpecial] = useState<boolean>();
  const [Infinite, setInfinite] = useState<boolean>();

  // States for success and error alerts
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // Submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoading(true);
    const dataTobeSent = { id: vaccineId, Name, IsSpecial, Infinite };
    console.log(dataTobeSent)
    const url = `${import.meta.env.VITE_API_URL}api/Vaccine/${vaccineId}`;
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
        router.push("/members/vaccine");
      } else if (!response.ok) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setShowLoading(false);
      setName("");
      setIsSpecial(false);
      setInfinite(false);
    }
  };
const canSubmit=Name.length>0;
  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={3000}
      />
      <IonPage>
       <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Vaccine Updated successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An Error occurred. Please try again."
        color="danger"
      />
        <HeaderButtons pageName="Update Vaccine" />
        <IonContent>
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel color="primary" position="floating">
                Name
              </IonLabel>
              <IonInput
                type="text"
                value={Name}
                onIonChange={(e) => setName(e.detail.value!)}
                required
                id="name"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Is-Special</IonLabel>
              <IonCheckbox
                checked={IsSpecial}
                onIonChange={(e) => setIsSpecial(e.detail.checked)}
                slot="end"
                id="special"
              ></IonCheckbox>
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Infinite</IonLabel>
              <IonCheckbox
                checked={Infinite}
                onIonChange={(e) => setInfinite(e.detail.checked)}
                slot="end"
                id="infinite"
              ></IonCheckbox>
            </IonItem>
            <IonButton
              type="submit"
              fill="solid"
              color="primary"
              expand="full"
              strong
              disabled={!canSubmit}
              id="submit"
            >
              Update Vaccine
            </IonButton>
            {/* <IonButton
              fill="solid"
              color="primary"
              expand="full"
              strong
              onClick={() => router.push("/members/vaccine", "root")}
            >
              Vaccine List
            </IonButton> */}
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditVaccine;
