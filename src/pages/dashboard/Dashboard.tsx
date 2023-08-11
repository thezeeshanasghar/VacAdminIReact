import {
  IonCard,
  IonCardHeader,
  IonPage,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../components/HeaderButtons";
import "./dashboard.css";
import DashboardSlides from "../../components/slider/DashboardSlides";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const Dashboard: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [length, setLength] = useState("");
  const [dLength, setDLength] = useState("");
// const fetchData=()=>{
//   fetch(`${import.meta.env.VITE_API_URL}api/Vaccine`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.length)
//     setLength(data.length)
//     // setShowLoading(false);
//   })

// fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
// .then((response) => response.json())
// .then((data) => {
//   console.log(data.length)
//   setDLength(data.length)
//   // setShowLoading(false);
// })
// }

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}api/Vaccine`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.length)
    setLength(data.length)
    // setShowLoading(false);
  })

fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
.then((response) => response.json())
.then((data) => {
  // console.log(data.length)
  setDLength(data.length)
  // setShowLoading(false);
})
}, []);

  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={1000}
      />
      <IonPage style={{ justifyContent: "flex-start" }}>
        <HeaderButtons pageName="Dashboard" />
        <IonCard>
          <IonCardHeader>
            <DashboardSlides />
          </IonCardHeader>
          <IonGrid style={{ fontWeight: "bold" }}>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonCard
                  color="secondary"
                  routerLink="/members/vaccine"
                  routerDirection="forward"
                >
                  <IonHeader className="custom-header-style">
                    <IonCardTitle>{length}</IonCardTitle>
                    <IonCardTitle style={{ marginTop: "8px" }}>
                      Active Vaccine
                    </IonCardTitle>
                  </IonHeader>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <IonCard
                  style={{ background: "#187da0" }}
                  routerLink="/members/doctor"
                  routerDirection="forward"
                >
                  <IonHeader className="custom-header-style">
                    <IonCardTitle>{dLength}</IonCardTitle>
                    <IonCardTitle style={{ marginTop: "8px" }}>
                      Active Doctors
                    </IonCardTitle>
                  </IonHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonPage>
    </>
  );
};

export default Dashboard;
// function fetchData() {
//   throw new Error("Function not implemented.");
// }

