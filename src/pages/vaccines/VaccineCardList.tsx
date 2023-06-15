import {
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../components/HeaderButtons";
import VaccineCard from "../../components/vaccine-card/VaccineCard";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { useLocation } from "react-router";

interface IVaccineData {
  DoseCount: number;
  BrandCount: number;
  vaccine: {
    Id: number;
    Name: string;
    IsSpecial: boolean;
    Infinite: boolean;
  };
}

export interface IAddVaccineProps {
  location: {
    search: string;
  };
}

const VaccineCardList: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<IVaccineData[]>([]);
  const [renderList, setRenderList] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    fetchVaccineData();
  }, [location]);

  const forceRender = () => {
    fetchVaccineData();
  };
  const fetchVaccineData = async () => {
    console.log(`${import.meta.env.VITE_API_URL}api/Vaccine/vaccine-with-count`)
    setShowLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/Vaccine/vaccine-with-count`)
      .then((response) => response.json())
      .then((data: IVaccineData[]) => {
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
          pageName="Vaccines"
          Showbutton={true}
          url="/members/vaccine/add"
        />
        <IonContent className="ion-padding">
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index * item.vaccine.Id + 1}>
                <VaccineCard
                  Id={item.vaccine.Id}
                  Name={item.vaccine.Name}
                  IsSpecial={item.vaccine.IsSpecial}
                  Infinite={item.vaccine.Infinite}
                  DoseCount={item.DoseCount}
                  BrandCount={item.BrandCount}
                  mt={index === 0}
                  renderList={forceRender}
                />
              </React.Fragment>
            ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccineCardList;
