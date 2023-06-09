import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../../components/HeaderButtons";
import VaccineBrandCard from "../../../components/vaccine-card/brand-card/VaccineBrandCard";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import { useLocation } from "react-router";
import ErrorComponent from "../../../components/error-component/ErrorComponent";

export interface IBrandData {
  Id: number;
  Name: string;
  VaccineId: number;
}
export interface VaccineIdProps {
  match: {
    params: {
      vaccineId: string;
    };
  };
}
const VaccineBrandCardList: React.FC<VaccineIdProps> = ({
  match: {
    params: { vaccineId },
  },
}) => {
  const location = useLocation();
  const [data, setData] = useState<IBrandData[]>([]);
  const [renderList, setRenderList] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    fetchBrandData();
  }, [vaccineId, renderList, location]);
  //force update to refresh list of brands;
  const forceRender = () => {
    fetchBrandData();
  };
  const fetchBrandData = async () => {
    setShowLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/vaccine/${vaccineId}/brands`)
      .then((response) => response.json())
      .then((data: IBrandData[]) => {
        setData(data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setShowLoading(false);
      })
      .finally(() => {
        setShowLoading(false);
      });
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
          pageName="Vaccine Brands"
          url={"/members/vaccine/" + vaccineId + "/brands/add"}
          Showbutton={true}
          backbutton={true}
          backUrl="/members/vaccine"
        />
        <IonContent className="ion-padding">
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index * item.Id + 1}>
                <VaccineBrandCard
                  Id={item.Id}
                  Name={item.Name}
                  VaccineId={item.VaccineId}
                  mt={index === 0}
                  renderList={forceRender}
                />
              </React.Fragment>
            ))
          ) : (
            <ErrorComponent title="Brands" />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccineBrandCardList;
