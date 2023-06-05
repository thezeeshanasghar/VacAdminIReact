import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import HeaderButtons from "../../../components/HeaderButtons";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import AlertSuccess from "../../../components/alerts/AlertError";
import AlertError from "../../../components/alerts/AlertError";
interface IParam {
  location: {
    search: string;
  };
  match: {
    params: {
      brandId: number;
      vaccineId: number;
    };
  };
}
const EditBrands: React.FC<IParam> = ({
  location: { search },
  match: {
    params: { brandId, vaccineId },
  },
}: IParam) => {
  const router = useIonRouter();
  const [showLoading, setShowLoading] = useState(false);
  //state variable to store brand Name from query parameter, using substring to remove first character '?'
  const [Name, setName] = useState(search.substring(1));
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoading(true);
    const dataTobeSent = { Name, id: brandId };
    const url = `https://myapi.fernflowers.com/api/Brand/${brandId}`;
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
          message="Brand updated successfully"
        />
        <AlertError
          isOpen={error}
          setOpen={setError}
          message="An Error occcured. Plz try again."
        />
        <HeaderButtons pageName="Update Brand"></HeaderButtons>
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
              Update Brand
            </IonButton>
            <IonButton
              fill="solid"
              color="primary"
              slot="start"
              expand="full"
              strong
              onClick={() =>
                router.push(`/members/vaccine/${vaccineId}/brands`, "root")
              }
            >
              Brand List
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditBrands;
