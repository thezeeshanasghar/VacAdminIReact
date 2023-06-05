import { IonFooter, IonItem, IonIcon, IonText } from "@ionic/react";
import { checkboxOutline, closeCircleOutline } from "ionicons/icons";
import React from "react";

const FooterButtons = ({
  approve = false,
  unapprove = false,
}: {
  approve?: boolean;
  unapprove?: boolean;
}) => {
  return (
    <>
      <IonFooter
        style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
      >
        <IonItem
          button
          routerLink="/members/doctor/approved"
          style={{
            "--background-hover": "transparent",
            "--color-hover": "blue",
            color: `${approve ? "blue" : ""}`,
          }}
        >
          <div className="custom-buttons-footer">
            <IonIcon icon={checkboxOutline} className="custom-footer-icon" />
            <IonText className="custom-text-sizing">Approved</IonText>
          </div>
        </IonItem>
        <IonItem
          button
          routerLink="/members/doctor/unapproved"
          style={{
            "--background-hover": "transparent",
            "--color-hover": "blue",
            color: `${unapprove ? "blue" : ""}`,
          }}
        >
          <div className="custom-buttons-footer">
            <IonIcon icon={closeCircleOutline} className="custom-footer-icon" />
            <IonText className="custom-text-sizing">Not Approved</IonText>
          </div>
        </IonItem>
      </IonFooter>
    </>
  );
};

export default FooterButtons;
