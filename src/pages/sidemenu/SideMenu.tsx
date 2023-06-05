import React from "react";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenu,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import Routes from "../../routes/Routes";
import {
  home,
  aperture,
  medkit,
  man,
  mail,
  colorFilter,
  powerSharp,
} from "ionicons/icons";
import "./SideMenu.css";
import logo from "../../assets/dashboard/vaccine-logo.png";
const SideMenu: React.FC = () => {
  const routes = [
    { name: "Dashboard", to: "/members/dashboard", icon: home },
    { name: "Vaccines", to: "/members/vaccine", icon: colorFilter },
    { name: "Doctors", to: "/members/doctor/approved", icon: medkit },
    { name: "Patients", to: "/members/patient", icon: man },
  ];
  return (
    <>
      <IonPage>
        <IonSplitPane contentId="main-content">
          <IonMenu contentId="main-content">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu Content</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {routes.map((item, index) => (
                  <IonItem
                    routerLink={item.to}
                    routerDirection="forward"
                    key={index}
                  >
                    <IonIcon icon={item.icon} slot="start" color="primary" />
                    {item.name}
                  </IonItem>
                ))}
              </IonList>
              <IonItem lines="none" className="divide-list-into-two-pieces">
                <IonImg
                  style={{
                    display: "inline-block",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo}
                ></IonImg>
              </IonItem>
            </IonContent>
            <IonFooter>
              <IonItem routerLink="/" routerDirection="back">
                <IonIcon icon={powerSharp} slot="start" color="primary" />
                <b>Logout</b>
              </IonItem>
            </IonFooter>
          </IonMenu>
          <Routes />
        </IonSplitPane>
      </IonPage>
    </>
  );
};

export default SideMenu;
