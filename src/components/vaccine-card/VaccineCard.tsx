import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { bandageOutline, create, trash } from "ionicons/icons";
import "./vaccineCard.css";
import DeletePopup from "../delete-popup/DeletePopup";
interface IVaccineData {
  Id: number;
  Name: string;
  // IsSpecial: boolean;
  Infinite: boolean;
  // DoseCount: number;
  // BrandCount: number;
  mt: boolean;
  renderList: () => void;
}
const VaccineCard: React.FC<IVaccineData> = ({
  Id,
  Name,
  // IsSpecial,
  Infinite,
  // DoseCount,
  // BrandCount,
  mt,
  renderList,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <DeletePopup
        url={`${import.meta.env.VITE_API_URL}api/Vaccine/${Id}`}
        title="Vaccine"
        confirmAlertOpen={showPopup}
        setConfirmAlertOpen={setShowPopup}
        renderList={renderList}
      />
      <IonCard style={{ marginTop: `${mt ? 0 : null}`, marginInline: 0 }}>
        <IonItem className="item md ion-focusable item-label hydrated">
          <IonIcon
            icon={bandageOutline}
            slot="start"
            style={{ marginRight: "16px" }}
            role="img"
            className="md hydrated"
            aria-label="bandage outline"
          ></IonIcon>
          <IonLabel className="sc-IonLabel-md-h sc-IonLabel-md-s md hydrated">
            <b>{Name}</b>
          </IonLabel>
          <IonButton
            fill="clear"
            className="custom-ripple"
            routerLink={`/members/vaccine/edit/${Id}?vaccineName=${Name}&Infinite=${Infinite}`}
            routerDirection="root"
            id={`edit${Id}`}
          >
            <IonIcon
              color="primary"
              icon={create}
              size="large"
              slot="end"
              tabIndex={0}
              role="img"
              className="md ion-color ion-color-primary icon-large hydrated"
              aria-label="create"
              
            />
          </IonButton>
          <IonButton
            className="custom-ripple"
            fill="clear"
            onClick={() => setShowPopup(true)}
            id={`delete${Id}`}
          >
            <IonIcon
              color="primary"
              icon={trash}
              size="large"
              slot="end"
              role="img"
              className="md ion-color ion-color-primary icon-large hydrated"
              aria-label="trash"
              
            />
          </IonButton>
        </IonItem>
        <IonCardContent className="md card-content-md hydrated">
          <span>
            {/* <b color="black">IsSpecial: </b> */}
            &nbsp; <b>Infinite: </b>
            {Infinite ? "True" : "False"}
          </span>
          <br></br>
          <IonButton
            color="tertiary"
            fill="outline"
            size="small"
            tabIndex={0}
            routerLink={`/members/vaccine/${Id}/doses`}
            routerDirection="forward"
            className="ion-color ion-color-tertiary md button button-small button-outline ion-activatable ion-focusable hydrated"
            id={`doses${Id}`}
          >
            Doses &nbsp;{" "}
            <IonBadge
              color="primary"
              className="ion-color ion-color-primary md hydrated"
            >
              {/* {DoseCount} */}
            </IonBadge>
          </IonButton>
          <IonButton
            color="tertiary"
            fill="outline"
            size="small"
            tabIndex={0}
            routerLink={`/members/vaccine/${Id}/brands`}
            routerDirection="forward"
            className="ion-color ion-color-tertiary md button button-small button-outline ion-activatable ion-focusable hydrated"
            id={`brands${Id}`}
          >
            {" "}
            Brands &nbsp;{" "}
            <IonBadge
              color="primary"
              className="ion-color ion-color-primary md hydrated"
            >
              {/* {BrandCount} */}
            </IonBadge>
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default VaccineCard;
