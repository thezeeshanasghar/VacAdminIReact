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
import Toast from "../../../components/Custom Toast/Toast";
const AddDoses: React.FC<VaccineIdProps & IhistoryObjectProps> = ({
  match: {
    params: { vaccineId },
  },
  history: { goBack },
}) => {
  const router = useIonRouter();
  const [Name, setName] = useState("");
  const [MinGap, setMinGap] = useState(0);
  const [MinAge, setMinAge] = useState({ value: 0, text: "" });
  //states varibale for alert, succesMsg and errorMsg
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // form submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Name, MinAge);
    const dataTobeSent = {
      name: Name,
      minAge: MinAge.value,
      minAgeText: MinAge.text,
      vaccineId,
    };
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
      setMinAge({ value: 0, text: "" });
      setMinGap(0);
    }
  };
  const handleSelectChange = (event: any) => {
    const selectedValue = event.detail.value;
    const selectedText = event.target.querySelector(
      `ion-select-option[value="${selectedValue}"]`
    ).textContent;
    setMinAge({ value: selectedValue, text: selectedText });
  };
  //@ts-ignore
  const canSubmit = Name.length > 0 && MinAge.value >= 0;
  return (
    <IonPage>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Dose added successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
        color="danger"
      />
      {/* <AlertSuccess
        isOpen={success}
        setOpen={setSuccess}
        message="Dose added successfully"
      />
      <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occcured. Plz try again."
      /> */}
      <HeaderButtons
        pageName="Add Dose"
        backbutton={true}
        backUrl={`/members/vaccine/${vaccineId}/doses`}
      ></HeaderButtons>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel color="primary" position="floating">
              Name
            </IonLabel>
            <IonInput
              type="text"
              value={Name} //@ts-ignore
              onIonChange={(e) => setName(e.detail.value)}
              required
              id="name"
            ></IonInput>
          </IonItem>
          {/* <IonDatetime presentation="month-year"></IonDatetime> */}
          <IonItem>
            <IonSelect
              label="MinAge"
              value={MinAge.value}
              onIonChange={handleSelectChange}
              labelPlacement="floating"
              id="select"
            >
              <IonSelectOption selected-text value="0">
                At Birth
              </IonSelectOption>
              <IonSelectOption value="1">1 Day</IonSelectOption>
              <IonSelectOption id="two" value="2">
                2 Days
              </IonSelectOption>
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
              <IonSelectOption value="15">2 Weeks</IonSelectOption>
              <IonSelectOption value="22">3 Weeks</IonSelectOption>
              <IonSelectOption value="29">4 Weeks</IonSelectOption>
              <IonSelectOption value="31">1 Month</IonSelectOption>
              <IonSelectOption value="36">5 Weeks</IonSelectOption>
              <IonSelectOption value="43">6 Weeks</IonSelectOption>
              <IonSelectOption value="50">7 Weeks</IonSelectOption>
              <IonSelectOption value="57">8 Weeks</IonSelectOption>
              <IonSelectOption value="64">9 Weeks</IonSelectOption>
              <IonSelectOption value="71">10 Weeks</IonSelectOption>
              <IonSelectOption value="78">11 Weeks</IonSelectOption>
              <IonSelectOption value="85">3 Months</IonSelectOption>
              <IonSelectOption value="92">13 Weeks</IonSelectOption>
              <IonSelectOption value="99">14 Weeks</IonSelectOption>
              <IonSelectOption value="106">15 Weeks</IonSelectOption>
              <IonSelectOption value="113">16 Weeks</IonSelectOption>
              <IonSelectOption value="120">17 Weeks</IonSelectOption>
              <IonSelectOption value="127">18 Weeks</IonSelectOption>
              <IonSelectOption value="134">19 Weeks</IonSelectOption>
              <IonSelectOption value="141">20 Weeks</IonSelectOption>
              <IonSelectOption value="148">21 Weeks</IonSelectOption>
              <IonSelectOption value="155">22 Weeks</IonSelectOption>
              <IonSelectOption value="162">23 Weeks</IonSelectOption>
              <IonSelectOption value="169">6 Months</IonSelectOption>
              <IonSelectOption value="213">7 Months</IonSelectOption>
              <IonSelectOption value="244">8 Months</IonSelectOption>
              <IonSelectOption value="275">9 Months</IonSelectOption>
              <IonSelectOption value="305">10 Months</IonSelectOption>
              <IonSelectOption value="335">11 Months</IonSelectOption>
              <IonSelectOption value="365">1 Year</IonSelectOption>
              <IonSelectOption value="396">13 Months</IonSelectOption>
              <IonSelectOption value="427">14 Months</IonSelectOption>
              <IonSelectOption value="457">15 Months</IonSelectOption>
              <IonSelectOption value="487">16 Months</IonSelectOption>
              <IonSelectOption value="518">17 Months</IonSelectOption>
              <IonSelectOption value="548">18 Months</IonSelectOption>
              <IonSelectOption value="579">19 Months</IonSelectOption>
              <IonSelectOption value="609">20 Months</IonSelectOption>
              <IonSelectOption value="610">21 Months</IonSelectOption>
              <IonSelectOption value="670">22 Months</IonSelectOption>
              <IonSelectOption value="700">23 Months</IonSelectOption>
              <IonSelectOption value="731">2 Years</IonSelectOption>
              <IonSelectOption value="761">25 Months</IonSelectOption>
              <IonSelectOption value="792">26 Months</IonSelectOption>
              <IonSelectOption value="822">27 Months</IonSelectOption>
              <IonSelectOption value="852">28 Months</IonSelectOption>
              <IonSelectOption value="884">29 Months</IonSelectOption>
              <IonSelectOption value="913">30 Months</IonSelectOption>
              <IonSelectOption value="944">31 Months</IonSelectOption>
              <IonSelectOption value="974">32 Months</IonSelectOption>
              <IonSelectOption value="1005">33 Months</IonSelectOption>
              <IonSelectOption value="1035">34 Months</IonSelectOption>
              <IonSelectOption value="1065">35 Months</IonSelectOption>
              <IonSelectOption value="1096">3 Years</IonSelectOption>
              <IonSelectOption value="1126">37 Months</IonSelectOption>
              <IonSelectOption value="1157">38 Months</IonSelectOption>
              <IonSelectOption value="1187">39 Months</IonSelectOption>
              <IonSelectOption value="1217">40 Months</IonSelectOption>
              <IonSelectOption value="1248">41 Months</IonSelectOption>
              <IonSelectOption value="1278">42 Months</IonSelectOption>
              <IonSelectOption value="1309">43 Months</IonSelectOption>
              <IonSelectOption value="1339">44 Months</IonSelectOption>
              <IonSelectOption value="1370">45 Months</IonSelectOption>
              <IonSelectOption value="1400">46 Months</IonSelectOption>
              <IonSelectOption value="1430">47 Months</IonSelectOption>
              <IonSelectOption value="1461">4 Years</IonSelectOption>
              <IonSelectOption value="1491">49 Months</IonSelectOption>
              <IonSelectOption value="1522">50 Months</IonSelectOption>
              <IonSelectOption value="1552">51 Months</IonSelectOption>
              <IonSelectOption value="1583">52 Months</IonSelectOption>
              <IonSelectOption value="1613">53 Months</IonSelectOption>
              <IonSelectOption value="1643">54 Months</IonSelectOption>
              <IonSelectOption value="1674">55 Months</IonSelectOption>
              <IonSelectOption value="1704">56 Months</IonSelectOption>
              <IonSelectOption value="1735">57 Months</IonSelectOption>
              <IonSelectOption value="1765">58 Months</IonSelectOption>
              <IonSelectOption value="1796">59 Months</IonSelectOption>
              <IonSelectOption value="1826">5 Years</IonSelectOption>
              <IonSelectOption value="2191">6 Years</IonSelectOption>
              <IonSelectOption value="2556">7 Years</IonSelectOption>
              <IonSelectOption value="2921">8 Years</IonSelectOption>
              <IonSelectOption value="3286">9 Years</IonSelectOption>
              <IonSelectOption value="3316">9 Year 1 Month</IonSelectOption>
              <IonSelectOption value="3651">10 Years</IonSelectOption>
              <IonSelectOption value="3834">10 Year 6 Months</IonSelectOption>
              <IonSelectOption value="4016">11 Years</IonSelectOption>
              <IonSelectOption value="4381">12 Years</IonSelectOption>
              <IonSelectOption value="4746">13 Years</IonSelectOption>
              <IonSelectOption value="5111">14 Years</IonSelectOption>
              <IonSelectOption value="5476">15 Years</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton
            type="submit"
            fill="solid"
            color="primary"
            slot="start"
            expand="full"
            strong
            disabled={!canSubmit}
            id="submit"
          >
            Add Dose
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddDoses;
