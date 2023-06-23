import React from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import Routes from "../../routes/Routes";
import {
  home,
  medkit,
  man,
  colorFilter,
  powerSharp,
  time,
} from "ionicons/icons";
import "./SideMenu.css";
import logo from "../../assets/dashboard/vaccine-logo.png";
import { useLocation } from "react-router";
const SideMenu: React.FC = () => {
  const location = useLocation();
  const routes = [
    { name: "Dashboard", to: "/members/dashboard", icon: home },
    { name: "Vaccines", to: "/members/vaccine", icon: colorFilter },
    { name: "Doctors", to: "/members/doctor/approved", icon: medkit },
    { name: "Patients", to: "/members/patient", icon: man },
    { name: "Schedule", to: "/members/schedule", icon: time },
  ];
  return (
    <>
      <IonPage>
        <IonSplitPane contentId="main-content">
          <IonMenu contentId="main-content" type="overlay">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {routes.map((item, index) => (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === item.to ? "selected" : ""
                      }
                      routerLink={item.to}
                      routerDirection="forward"
                    >
                      <IonIcon icon={item.icon} slot="start" color="primary" />
                      {item.name}
                    </IonItem>
                  </IonMenuToggle>
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
