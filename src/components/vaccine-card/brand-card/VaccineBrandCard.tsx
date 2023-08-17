import {
  IonBadge,
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { bandageOutline, colorFilter, create, trash } from "ionicons/icons";
//   import "./vaccineCard.css";
import { IBrandData } from "../../../pages/vaccines/brands/VaccineBrandCardList";
import DeletePopup from "../../delete-popup/DeletePopup";
interface IimprovedIBrandData extends IBrandData {
  mt: boolean;
  renderList: () => void;
}
const VaccineBrandCard: React.FC<IimprovedIBrandData> = ({
  Id,
  Name,
  VaccineId,
  mt,
  renderList,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <DeletePopup
        url={`${import.meta.env.VITE_API_URL}api/brand/${Id}`}
        title="Brand"
        confirmAlertOpen={showPopup}
        setConfirmAlertOpen={setShowPopup}
        renderList={renderList}
      />
      <IonCard style={{ marginTop: `${mt ? 0 : null}`, marginInline: 0 }}>
        <IonItem className="item md ion-focusable item-label hydrated">
          <IonIcon
            icon={colorFilter}
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
            routerLink={`/members/vaccine/${VaccineId}/brands/edit/${Id}?brandName=${Name}`}
            routerDirection="root"
            id={`brande${Id}`}
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
            expand="full"
            onClick={() => setShowPopup(true)}
            id={`brandd${Id}`}
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
      </IonCard>
    </>
  );
};

export default VaccineBrandCard;
