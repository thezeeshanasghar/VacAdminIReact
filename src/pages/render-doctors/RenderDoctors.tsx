import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { checkboxOutline, closeCircleOutline } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import ApprovedDoctorList from "../doctors/approved-doctors/ApprovedDoctorList";
import UnApprovedDoctorList from "../doctors/unapproved-doctors/UnApprovedDoctorList";
type Props = {
  match: {
    url: string;
  };
};
export const RenderDoctor: React.FC<Props> = ({ match: { url } }) => {
  return (
    <IonPage>
      <IonTabs className="md hydrated">
        <IonRouterOutlet>
          <Route
            path="/members/doctor/approved"
            render={() => <ApprovedDoctorList />}
            exact={true}
          />
          <Route
            path="/members/doctor/unapproved"
            render={() => <UnApprovedDoctorList />}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton href="/members/doctor/approved">
            <IonIcon icon={checkboxOutline} />
            <IonLabel>Approved</IonLabel>
          </IonTabButton>

          <IonTabButton href="/members/doctor/unapproved">
            <IonIcon icon={closeCircleOutline} />
            <IonLabel>UnApproved</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};
