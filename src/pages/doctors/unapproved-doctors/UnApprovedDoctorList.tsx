import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../../components/HeaderButtons";
import UnApprovedDoctorsCard from "../../../components/doctor-card/UnApprovedDoctorsCard";
import FooterButtons from "../../../components/doctor-card/footer-buttons-for-doctor-lists/FooterButtons";
import { IdoctorData } from "../approved-doctors/ApprovedDoctorList";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
const UnApprovedDoctorList: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [data, setData] = useState<IdoctorData[]>([]);
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
  }, []);

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
          Showbutton={false}
          backbutton={true}
          backUrl="/members/vaccine"
        />
        <IonContent className="ion-padding">
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                {item.IsApproved === false && (
                  <UnApprovedDoctorsCard
                    mt={data
                      .slice(0, index)
                      .some((prevItem) => prevItem.IsApproved)}
                    Id={item.Id}
                    Name={item.Name}
                    MobileNumber={item.MobileNumber}
                    Password={item.Password}
                    IsApproved={item.IsApproved}
                    IsEnabled={item.IsEnabled}
                    Email={item.Email}
                    DoctorType={item.DoctorType}
                    PMDC={item.PMDC}
                    ValidUpto={item.ValidUpto}
                    renderList={forceRender}
                  />
                )}
              </React.Fragment>
            ))}
        </IonContent>
        <FooterButtons unapprove={true} />
      </IonPage>
    </>
  );
};

export default UnApprovedDoctorList;
