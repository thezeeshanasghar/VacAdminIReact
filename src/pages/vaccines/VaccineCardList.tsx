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
import ErrorComponent from "../../components/error-component/ErrorComponent";

interface IVaccineData {
  Infinite: boolean;
  IsSpecial: boolean;
  Name: string;
  Id: number;
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
    setShowLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}api/Vaccine`)
      .then((response) => response.json())
      .then((data: IVaccineData[]) => {
        // console.log('zeeshan')
        // console.log(data)
        setData(data);
        setShowLoading(true);
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <React.Fragment key={index * item.Id + 1}>
                <VaccineCard
                  Id={item.Id}
                  Name={item.Name}
                  IsSpecial={item.IsSpecial}
                  Infinite={item.Infinite}
                  // DoseCount={item.DoseCount}
                  // BrandCount={item.BrandCount}
                  mt={index === 0}
                  renderList={forceRender}               />
              </React.Fragment>
            ))
          ) : (
            <ErrorComponent title="Vaccines" />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccineCardList;
