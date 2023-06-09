import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonAlert,
  useIonRouter,
} from "@ionic/react";
import HeaderButtons from "../../../components/HeaderButtons";
import { VaccineIdProps } from "../brands/VaccineBrandCardList";
import { IhistoryObjectProps } from "../AddVaccine";
import AlertSuccess from "../../../components/alerts/AlertSuccess";
import AlertError from "../../../components/alerts/AlertError";
const AddDoses: React.FC<VaccineIdProps & IhistoryObjectProps> = ({
  match: {
    params: { vaccineId },
  },
  history: { goBack },
}) => {
  const router = useIonRouter();
  const [Name, setName] = useState("");
  const [MinGap, setMinGap] = useState(0);
  const [MinAge, setMinAge] = useState(0);
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // form submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Name, MinAge);
    const dataTobeSent = { Name, MinAge, MinGap, VaccineId: vaccineId };
    const url = `${import.meta.env.VITE_API_URL}api/Dose`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      });
      if (response.status === 201) {
        setSuccess(true);
        router.push(`/members/vaccine/${vaccineId}/doses`);
      } else if (response.status !== 201) {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.log("error : ", err);
    } finally {
      setName("");
      setMinGap(0);
      setMinAge(0);
    }
  };
  const canSubmit=Name.length>0 && MinAge.length>0;
  return (
    <IonPage>
      <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Dose added successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
      />
      <HeaderButtons pageName="Add Dose"></HeaderButtons>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel color="primary" position="floating">
              Name
            </IonLabel>
            <IonInput
              type="text"
              value={Name}               //@ts-ignore
              onIonChange={(e) => setName(e.detail.value)}
              required
            ></IonInput>
          </IonItem>
          {/* <IonDatetime presentation="month-year"></IonDatetime> */}
          <IonItem>
            <IonSelect
              label="MinAge"
              value={MinAge}
              onIonChange={(e) => setMinAge(e.detail.value)}
              labelPlacement="floating"
            >
              <IonSelectOption selected-text value="0">
                At Birth
              </IonSelectOption>
              <IonSelectOption value="1">1 Day</IonSelectOption>
              <IonSelectOption value="2">2 Days</IonSelectOption>
              <IonSelectOption value="3">3 Days</IonSelectOption>
              <IonSelectOption value="4">4 Days</IonSelectOption>
              <IonSelectOption value="5">5 Days</IonSelectOption>
              <IonSelectOption value="6">6 Days</IonSelectOption>
              <IonSelectOption value="7">1 Week</IonSelectOption>
              <IonSelectOption value="8">8 Days</IonSelectOption>
              <IonSelectOption value="9">9 Days</IonSelectOption>
              <IonSelectOption value="10">10 Days</IonSelectOption>
              <IonSelectOption value="11">11 Days</IonSelectOption>
              <IonSelectOption value="12">12 Days</IonSelectOption>
              <IonSelectOption value="13">13 Days</IonSelectOption>
              <IonSelectOption value="14">2 Weeks</IonSelectOption>
              <IonSelectOption value="21">3 Weeks</IonSelectOption>
              <IonSelectOption value="28">4 Weeks</IonSelectOption>
              <IonSelectOption value="35">5 Weeks</IonSelectOption>
              <IonSelectOption value="42">6 Weeks</IonSelectOption>
              <IonSelectOption value="49">7 Weeks</IonSelectOption>
              <IonSelectOption value="56">8 Weeks</IonSelectOption>
              <IonSelectOption value="63">9 Weeks</IonSelectOption>
              <IonSelectOption value="70">10 Weeks</IonSelectOption>
              <IonSelectOption value="77">11 Weeks</IonSelectOption>
              <IonSelectOption value="84">3 Months</IonSelectOption>
              <IonSelectOption value="91">13 Weeks</IonSelectOption>
              <IonSelectOption value="98">14 Weeks</IonSelectOption>
              <IonSelectOption value="105">15 Weeks</IonSelectOption>
              <IonSelectOption value="112">16 Weeks</IonSelectOption>
              <IonSelectOption value="119">17 Weeks</IonSelectOption>
              <IonSelectOption value="126">18 Weeks</IonSelectOption>
              <IonSelectOption value="133">19 Weeks</IonSelectOption>
              <IonSelectOption value="140">20 Weeks</IonSelectOption>
              <IonSelectOption value="147">21 Weeks</IonSelectOption>
              <IonSelectOption value="154">22 Weeks</IonSelectOption>
              <IonSelectOption value="161">23 Weeks</IonSelectOption>
              <IonSelectOption value="168">6 Months</IonSelectOption>
              <IonSelectOption value="212">7 Months</IonSelectOption>
              <IonSelectOption value="243">8 Months</IonSelectOption>
              <IonSelectOption value="274">9 Months</IonSelectOption>
              <IonSelectOption value="304">10 Months</IonSelectOption>
              <IonSelectOption value="334">11 Months</IonSelectOption>
              <IonSelectOption value="365">1 Year</IonSelectOption>
              <IonSelectOption value="395">13 Months</IonSelectOption>
              <IonSelectOption value="426">14 Months</IonSelectOption>
              <IonSelectOption value="456">15 Months</IonSelectOption>
              <IonSelectOption value="486">16 Months</IonSelectOption>
              <IonSelectOption value="517">17 Months</IonSelectOption>
              <IonSelectOption value="547">18 Months</IonSelectOption>
              <IonSelectOption value="578">19 Months</IonSelectOption>
              <IonSelectOption value="608">20 Months</IonSelectOption>
              <IonSelectOption value="639">21 Months</IonSelectOption>
              <IonSelectOption value="669">22 Months</IonSelectOption>
              <IonSelectOption value="699">23 Months</IonSelectOption>
              <IonSelectOption value="730">2 Years</IonSelectOption>
              <IonSelectOption value="760">25 Months</IonSelectOption>
              <IonSelectOption value="791">26 Months</IonSelectOption>
              <IonSelectOption value="821">27 Months</IonSelectOption>
              <IonSelectOption value="851">28 Months</IonSelectOption>
              <IonSelectOption value="882">29 Months</IonSelectOption>
              <IonSelectOption value="912">30 Months</IonSelectOption>
              <IonSelectOption value="943">31 Months</IonSelectOption>
              <IonSelectOption value="973">32 Months</IonSelectOption>
              <IonSelectOption value="1004">33 Months</IonSelectOption>
              <IonSelectOption value="1034">34 Months</IonSelectOption>
              <IonSelectOption value="1064">35 Months</IonSelectOption>
              <IonSelectOption value="1095">3 Years</IonSelectOption>
              <IonSelectOption value="1125">37 Months</IonSelectOption>
              <IonSelectOption value="1156">38 Months</IonSelectOption>
              <IonSelectOption value="1186">39 Months</IonSelectOption>
              <IonSelectOption value="1216">40 Months</IonSelectOption>
              <IonSelectOption value="1247">41 Months</IonSelectOption>
              <IonSelectOption value="1277">42 Months</IonSelectOption>
              <IonSelectOption value="1308">43 Months</IonSelectOption>
              <IonSelectOption value="1338">44 Months</IonSelectOption>
              <IonSelectOption value="1369">45 Months</IonSelectOption>
              <IonSelectOption value="1399">46 Months</IonSelectOption>
              <IonSelectOption value="1429">47 Months</IonSelectOption>
              <IonSelectOption value="1460">4 Years</IonSelectOption>
              <IonSelectOption value="1490">49 Months</IonSelectOption>
              <IonSelectOption value="1521">50 Months</IonSelectOption>
              <IonSelectOption value="1551">51 Months</IonSelectOption>
              <IonSelectOption value="1582">52 Months</IonSelectOption>
              <IonSelectOption value="1612">53 Months</IonSelectOption>
              <IonSelectOption value="1642">54 Months</IonSelectOption>
              <IonSelectOption value="1673">55 Months</IonSelectOption>
              <IonSelectOption value="1703">56 Months</IonSelectOption>
              <IonSelectOption value="1734">57 Months</IonSelectOption>
              <IonSelectOption value="1764">58 Months</IonSelectOption>
              <IonSelectOption value="1795">59 Months</IonSelectOption>
              <IonSelectOption value="1825">5 Years</IonSelectOption>
              <IonSelectOption value="2190">6 Years</IonSelectOption>
              <IonSelectOption value="2555">7 Years</IonSelectOption>
              <IonSelectOption value="2920">8 Years</IonSelectOption>
              <IonSelectOption value="3285">9 Years</IonSelectOption>
              <IonSelectOption value="3315">9 Year 1 Month</IonSelectOption>
              <IonSelectOption value="3650">10 Years</IonSelectOption>
              <IonSelectOption value="3833">10 Year 6 Months</IonSelectOption>
              <IonSelectOption value="4015">11 Years</IonSelectOption>
              <IonSelectOption value="4380">12 Years</IonSelectOption>
              <IonSelectOption value="4745">13 Years</IonSelectOption>
              <IonSelectOption value="5110">14 Years</IonSelectOption>
              <IonSelectOption value="5475">15 Years</IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* <IonItem>
            <IonSelect
              color="primary"
              value={MinGap}
              onIonChange={(e) => setMinGap(e.detail.value)}
              label="MinGap"
              labelPlacement="floating"
            >
              <IonSelectOption selected-text value="0">
                No Gap
              </IonSelectOption>
              <IonSelectOption value="1">1 Day</IonSelectOption>
              <IonSelectOption value="2">2 Days</IonSelectOption>
              <IonSelectOption value="3">3 Days</IonSelectOption>
              <IonSelectOption value="4">4 Days</IonSelectOption>
              <IonSelectOption value="5">5 Days</IonSelectOption>
              <IonSelectOption value="6">6 Days</IonSelectOption>
              <IonSelectOption value="7">1 Week</IonSelectOption>
              <IonSelectOption value="8">8 Days</IonSelectOption>
              <IonSelectOption value="9">9 Days</IonSelectOption>
              <IonSelectOption value="10">10 Days</IonSelectOption>
              <IonSelectOption value="11">11 Days</IonSelectOption>
              <IonSelectOption value="12">12 Days</IonSelectOption>
              <IonSelectOption value="13">13 Days</IonSelectOption>
              <IonSelectOption value="14">2 Weeks</IonSelectOption>
              <IonSelectOption value="21">3 Weeks</IonSelectOption>
              <IonSelectOption value="28">4 Weeks</IonSelectOption>
              <IonSelectOption value="35">5 Weeks</IonSelectOption>
              <IonSelectOption value="42">6 Weeks</IonSelectOption>
              <IonSelectOption value="49">7 Weeks</IonSelectOption>
              <IonSelectOption value="56">8 Weeks</IonSelectOption>
              <IonSelectOption value="63">9 Weeks</IonSelectOption>
              <IonSelectOption value="70">10 Weeks</IonSelectOption>
              <IonSelectOption value="77">11 Weeks</IonSelectOption>
              <IonSelectOption value="84">3 Months</IonSelectOption>
              <IonSelectOption value="91">13 Weeks</IonSelectOption>
              <IonSelectOption value="98">14 Weeks</IonSelectOption>
              <IonSelectOption value="105">15 Weeks</IonSelectOption>
              <IonSelectOption value="112">16 Weeks</IonSelectOption>
              <IonSelectOption value="119">17 Weeks</IonSelectOption>
              <IonSelectOption value="126">18 Weeks</IonSelectOption>
              <IonSelectOption value="133">19 Weeks</IonSelectOption>
              <IonSelectOption value="140">20 Weeks</IonSelectOption>
              <IonSelectOption value="147">21 Weeks</IonSelectOption>
              <IonSelectOption value="154">22 Weeks</IonSelectOption>
              <IonSelectOption value="161">23 Weeks</IonSelectOption>
              <IonSelectOption value="168">6 Months</IonSelectOption>
              <IonSelectOption value="212">7 Months</IonSelectOption>
              <IonSelectOption value="243">8 Months</IonSelectOption>
              <IonSelectOption value="274">9 Months</IonSelectOption>
              <IonSelectOption value="304">10 Months</IonSelectOption>
              <IonSelectOption value="334">11 Months</IonSelectOption>
              <IonSelectOption value="365">1 Year</IonSelectOption>
              <IonSelectOption value="395">13 Months</IonSelectOption>
              <IonSelectOption value="426">14 Months</IonSelectOption>
              <IonSelectOption value="456">15 Months</IonSelectOption>
              <IonSelectOption value="486">16 Months</IonSelectOption>
              <IonSelectOption value="517">17 Months</IonSelectOption>
              <IonSelectOption value="547">18 Months</IonSelectOption>
              <IonSelectOption value="578">19 Months</IonSelectOption>
              <IonSelectOption value="608">20 Months</IonSelectOption>
              <IonSelectOption value="639">21 Months</IonSelectOption>
              <IonSelectOption value="669">22 Months</IonSelectOption>
              <IonSelectOption value="699">23 Months</IonSelectOption>
              <IonSelectOption value="730">2 Years</IonSelectOption>
              <IonSelectOption value="760">25 Months</IonSelectOption>
              <IonSelectOption value="791">26 Months</IonSelectOption>
              <IonSelectOption value="821">27 Months</IonSelectOption>
              <IonSelectOption value="851">28 Months</IonSelectOption>
              <IonSelectOption value="882">29 Months</IonSelectOption>
              <IonSelectOption value="912">30 Months</IonSelectOption>
              <IonSelectOption value="943">31 Months</IonSelectOption>
              <IonSelectOption value="973">32 Months</IonSelectOption>
              <IonSelectOption value="1004">33 Months</IonSelectOption>
              <IonSelectOption value="1034">34 Months</IonSelectOption>
              <IonSelectOption value="1064">35 Months</IonSelectOption>
              <IonSelectOption value="1095">3 Years</IonSelectOption>
              <IonSelectOption value="1125">37 Months</IonSelectOption>
              <IonSelectOption value="1156">38 Months</IonSelectOption>
              <IonSelectOption value="1186">39 Months</IonSelectOption>
              <IonSelectOption value="1216">40 Months</IonSelectOption>
              <IonSelectOption value="1247">41 Months</IonSelectOption>
              <IonSelectOption value="1277">42 Months</IonSelectOption>
              <IonSelectOption value="1308">43 Months</IonSelectOption>
              <IonSelectOption value="1338">44 Months</IonSelectOption>
              <IonSelectOption value="1369">45 Months</IonSelectOption>
              <IonSelectOption value="1399">46 Months</IonSelectOption>
              <IonSelectOption value="1429">47 Months</IonSelectOption>
              <IonSelectOption value="1460">4 Years</IonSelectOption>
              <IonSelectOption value="1490">49 Months</IonSelectOption>
              <IonSelectOption value="1521">50 Months</IonSelectOption>
              <IonSelectOption value="1551">51 Months</IonSelectOption>
              <IonSelectOption value="1582">52 Months</IonSelectOption>
              <IonSelectOption value="1612">53 Months</IonSelectOption>
              <IonSelectOption value="1642">54 Months</IonSelectOption>
              <IonSelectOption value="1673">55 Months</IonSelectOption>
              <IonSelectOption value="1703">56 Months</IonSelectOption>
              <IonSelectOption value="1734">57 Months</IonSelectOption>
              <IonSelectOption value="1764">58 Months</IonSelectOption>
              <IonSelectOption value="1795">59 Months</IonSelectOption>
              <IonSelectOption value="1825">5 Years</IonSelectOption>
              <IonSelectOption value="2190">6 Years</IonSelectOption>
              <IonSelectOption value="2555">7 Years</IonSelectOption>
              <IonSelectOption value="2920">8 Years</IonSelectOption>
              <IonSelectOption value="3285">9 Years</IonSelectOption>
              <IonSelectOption value="3315">9 Year 1 Month</IonSelectOption>
              <IonSelectOption value="3650">10 Years</IonSelectOption>
              <IonSelectOption value="3833">10 Year 6 Months</IonSelectOption>
              <IonSelectOption value="4015">11 Years</IonSelectOption>
              <IonSelectOption value="4380">12 Years</IonSelectOption>
              <IonSelectOption value="4745">13 Years</IonSelectOption>
              <IonSelectOption value="5110">14 Years</IonSelectOption>
              <IonSelectOption value="5475">15 Years</IonSelectOption>
              <IonSelectOption value="5505">15 Years 1 Month</IonSelectOption>
              <IonSelectOption value="5655">15 Years 6 Months</IonSelectOption>
            </IonSelect>
          </IonItem> */}
          <IonButton
            type="submit"
            fill="solid"
            color="primary"
            slot="start"
            expand="full"
            strong
            disabled={!canSubmit}
          >
            Add Dose
          </IonButton>
          {/* <IonButton
            fill="solid"
            color="primary"
            slot="start"
            expand="full"
            strong
            onClick={() =>
              router.push(`/members/vaccine/${vaccineId}/doses`, "root")
            }
          >
            Dose List
          </IonButton> */}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddDoses;
