import React, { useEffect,useState } from "react";
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
  useEffect(()=> {
    // Extracting data from the URL
  const searchParams = new URLSearchParams(search);
  const BrandName = searchParams.get("brandName")
  // const VaccineIsSpecial = searchParams.get("minAge");
  // const VaccineInfinite = searchParams.get("minGap");
  
  // Initial values
  // const initialIsSpecial = VaccineIsSpecial ;
  // const initialInfinite = VaccineInfinite ;
  //@ts-ignore
  BrandName && setName(BrandName);
  // setMinAge(VaccineIsSpecial)
  // setMinGap(VaccineInfinite)
  },[search])
  //state variable to store brand Name from query parameter, using substring to remove first character '?'
  const [Name, setName] = useState("");
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLoading(true);
    const dataTobeSent = { Name, id: brandId };
    const url = `${import.meta.env.VITE_API_URL}api/Brand/${brandId}`;
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
        router.push(`/members/vaccine/${vaccineId}/brands`);
      } else if (!response.ok) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setShowLoading(false);
      setName("");
    }
  };
  const canSubmit=Name.length>0
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
                required
              ></IonInput>
            </IonItem>
            <IonButton
              type="submit"
              fill="solid"
              color="primary"
              slot="start"
              expand="full"
              strong
              disabled={!canSubmit}
            >
              Update Brand
            </IonButton>
            {/* <IonButton
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
            </IonButton> */}
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditBrands;
