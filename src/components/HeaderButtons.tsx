import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { add, caretBack, chevronBack } from "ionicons/icons";
type Props = {
  pageName: string;
  Showbutton?: boolean;
  url?: string;
  backbutton?: boolean;
  backUrl?: string;
};
const HeaderButtons: React.FC<Props> = ({
  pageName,
  Showbutton = false,
  url,
  backbutton = false,
  backUrl,
}) => {
  // const windowSize: any = useWindowSize();
  const router = useIonRouter();
  return (
    <IonHeader>
      <IonToolbar color="primary" style={{ padding: "0px 5px" }}>
        <IonMenuToggle slot="start">
          <IonMenuButton></IonMenuButton>
        </IonMenuToggle>
        <IonTitle style={{ padding: 0 }}>{pageName}</IonTitle>

        {backbutton && (
          <IonButtons
            slot="start"
            onClick={() => router.push(backUrl ? backUrl : "", "back")}
            style={{ marginRight: 10, cursor: "pointer" }}
          >
            <IonIcon color="light" size="large" icon={chevronBack}>
              Back
            </IonIcon>
          </IonButtons>
        )}

        {Showbutton && (
          <IonButton
            fill="clear"
            slot="end"
            style={{ color: "#fff" }}
            onClick={() => router.push(url ? url : "", "root")}
          >
            <IonIcon icon={add} slot="start" />
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderButtons;
