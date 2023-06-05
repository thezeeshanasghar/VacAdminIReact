import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../../components/HeaderButtons";
import VaccineDoseCard from "../../../components/vaccine-card/dose-card/VaccineDoseCard";
import { VaccineIdProps } from "../brands/VaccineBrandCardList";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import { useLocation } from "react-router";
export interface IDoseData {
  Id: number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
}
type ILocationProps = { location: { search: string } };
const VaccineDoseCardList: React.FC<VaccineIdProps & ILocationProps> = ({
  location: { search },
  match: {
    params: { vaccineId },
  },
}) => {
  const location = useLocation();
  const [data, setData] = useState<IDoseData[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [renderList, setRenderList] = useState<boolean>(false);
  const fetchDoseData = async () => {
    setShowLoading(true);
    fetch(`https://myapi.fernflowers.com/api/Dose/dose_name/${vaccineId}`)
      .then((response) => response.json())
      .then((data: IDoseData[]) => {
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
  useEffect(() => {
    fetchDoseData();
  }, [vaccineId, location]);

  //force update to refresh list of doses;
  const forceRender = () => {
    fetchDoseData();
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
          pageName="Doses"
          Showbutton={true}
          url={`/members/vaccine/${vaccineId}/doses/add`}
          backbutton={true}
          backUrl="/members/vaccine"
        />
        <IonContent className="ion-padding">
          {data &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                <VaccineDoseCard
                  mt={index == 0}
                  Id={item.Id}
                  Name={item.Name}
                  MinAge={item.MinAge}
                  MinGap={item.MinGap}
                  VaccineId={item.VaccineId}
                  renderList={forceRender}
                />
              </React.Fragment>
            ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default VaccineDoseCardList;
