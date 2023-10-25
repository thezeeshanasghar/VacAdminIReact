import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import React, { useState } from "react";
import "./vaccineDoseCard.css";
import { IDoseData } from "../../../pages/vaccines/doses/VaccineDoseCardList";
import DeletePopup from "../../delete-popup/DeletePopup";
interface IDoseDataWithMt extends IDoseData {
  mt: boolean;
  renderList: () => void;
}
const VaccineDoseCard: React.FC<IDoseDataWithMt> = ({
  mt,
  Id,
  Name,
  VaccineId,
  MinAge,
  // MinGap,
  renderList,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [minAge, setMinAge] = useState(MinAge);
  return (
    <>
      <DeletePopup
        url={`${import.meta.env.VITE_API_URL}api/Dose/${Id}`}
        title="Dose"
        confirmAlertOpen={showPopup}
        setConfirmAlertOpen={setShowPopup}
        renderList={renderList}
      />
      <IonCard style={{ marginTop: `${mt ? 0 : null}`, marginInline: 0 }}>
        <IonItem>
          <IonLabel>{Name}</IonLabel>
          <IonItem slot="end">
            <IonButton
              fill="clear"
              className="custom-ripple doses-buttons"
              routerLink={`/members/vaccine/${VaccineId}/doses/edit/${Id}?doseName=${Name.replace(
                "#",
                "-"
              )}&minAge=${MinAge}`}
              routerDirection="root"
              id={`dosee${Id}`}
            >
              <IonIcon
                color="primary"
                icon={create}
                slot="end"
                tabIndex={0}
                aria-label="create"
              />
            </IonButton>
            <IonButton
              className="custom-ripple doses-buttons"
              fill="clear"
              expand="full"
              onClick={() => setShowPopup(true)}
              id={`dosed${Id}`}
            >
              <IonIcon
                color="primary"
                icon={trash}
                slot="end"
                aria-label="trash"
              />
            </IonButton>
          </IonItem>
        </IonItem>
        <IonCardContent>
          <p>
            Minimum Age Limit: 
            {MinAge === 0
              ? "at birth"
              : MinAge < 169
              ? `${Math.floor(MinAge / 7)} weeks`
              : MinAge % 365 === 0
              ? `${Math.floor(MinAge / 365)} years`
              : MinAge % 30 === 0
              ? `${Math.floor(MinAge / 30)} months`
              : MinAge > 30 && MinAge != 169 && MinAge != 365 ? `${Math.floor(MinAge / 30)} months` : `${MinAge} days`}
          </p>
          {/* <p>Minimum Gap Limit: {MinGap} Days</p> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default VaccineDoseCard;
