import { IonCard, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../../components/HeaderButtons";
// import ApprovedDoctorsCard from "../../../components/doctor-card/ApprovedDoctorsCard";
// import "../doctorsFooterButtonStyle.css";
// import FooterButtons from "../../../components/doctor-card/footer-buttons-for-doctor-lists/FooterButtons";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import ErrorComponent from "../../../components/error-component/ErrorComponent";
import { useLocation } from "react-router";
export interface IPatientData {
    Id: number,
    Name: string,
    FatherName: string,
    Email: string,
    DOB: string,
    Gender: number,
    City: string,
    CNIC: number,
    MobileNumber: number,
    IsEPIDone: boolean,
    IsVerified: boolean,
    IsInactive: boolean,
    ClinicId: number,
    DoctorId: number,
  }
  interface IParam {
    match: {
      params: {
        Id: number;
      };
    };
  }
const AllPatients: React.FC = ({match}) => {
    const { Id } = match.params;
  const location = useLocation();
  const [data, setData] = useState<IPatientData[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const fetchPatientData = async () => {
    setShowLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/Child/patients_get_by_doctor_id?doctorId=${Id}`)
      .then((response) => response.json())
      .then((data: IPatientData[]) => {
        setData(data);
        setShowLoading(false);
        console.log(data)
      })
      .catch((error) => {
        setShowLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPatientData();
  }, [location]);
  // force render to refresh doctor list;
//   const forceRender = () => {
//     fetchDoctorData();
//   };
  return (
    <>
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={5000}
      />
      <IonPage>
        <HeaderButtons
          pageName="Patients"
          backbutton={true}
          backUrl="/members/doctor"
        />
        <IonContent className="ion-padding">
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index}>
                {item.Id && (
                  <IonCard
                  style={{
                    padding: '10px',
                    margin: '10px',
                    fontWeight: 'bold',
                    // backgroundColor: '#f2f2f2',
                    borderRadius: '10px',
                  }}
                >
                    {item.Name}
                  </IonCard>
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

export default AllPatients;
