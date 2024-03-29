import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../../components/HeaderButtons";
import ApprovedDoctorsCard from "../../../components/doctor-card/ApprovedDoctorsCard";
import "../doctorsFooterButtonStyle.css";
import FooterButtons from "../../../components/doctor-card/footer-buttons-for-doctor-lists/FooterButtons";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import ErrorComponent from "../../../components/error-component/ErrorComponent";
import { useLocation } from "react-router";
export interface IdoctorData {
  Id: number;
  Name: string;
  MobileNumber: string;
  Password: string;
  // IsApproved: boolean;
  // IsEnabled: boolean;
  Email: string;
  // DoctorType: string;
  PMDC: string;
  ValidUpto: string;
}
const ApprovedDoctorList: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<IdoctorData[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const fetchDoctorData = async () => {
    setShowLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
      .then((response) => response.json())
      .then((data: IdoctorData[]) => {
        setData(data);
        setShowLoading(false);
      })
      .catch((error) => {
        setShowLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDoctorData();
  }, [location]);
  // force render to refresh doctor list;
  const forceRender = () => {
    fetchDoctorData();
  };
  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={5000}
      />
      <IonPage>
        <HeaderButtons
          pageName="Doctors"
          backbutton={true}
          backUrl="/members/dashboard"
        />
        <IonContent className="ion-padding">
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index}>
                {item.Id && (
                  <ApprovedDoctorsCard
                    mt={index === 0}
                    Id={item.Id}
                    Name={item.Name}
                    MobileNumber={item.MobileNumber}
                    Password={item.Password}
                    // IsApproved={item.IsApproved}
                    // IsEnabled={item.IsEnabled}
                    Email={item.Email}
                    // DoctorType={item.DoctorType}
                    PMDC={item.PMDC}
                    ValidUpto={item.ValidUpto}
                    renderList={forceRender}
                  />
                )}
              </React.Fragment>
            ))
          ) : (
            <ErrorComponent title="Doctors" />
          )}
        </IonContent>
        {/* <FooterButtons approve={true} /> */}
      </IonPage>
    </>
  );
};

export default ApprovedDoctorList;
