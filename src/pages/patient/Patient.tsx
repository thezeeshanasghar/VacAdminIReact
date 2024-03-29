import {
  IonContent,
  IonItem,
  IonPage,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTitle,
  IonText,
  IonItemDivider,
  IonRow,
  IonCol,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import HeaderButtons from "../../components/HeaderButtons";
import axios from "axios";
import Toast from "../../components/Custom Toast/Toast";
interface IPatientProps {
  Id: number;
  Name: string;
  Guardian: string;
  FatherName: string;
  Email: string;
  DOB: string;
  Gender: number;
  Type: string;
  City: string;
  CNIC: string;
  MobileNumber: number;
  PreferredSchedule: string;
  IsEPIDone: boolean;
  IsVerified: boolean;
  IsInactive: boolean;
  ClinicId: number;
  DoctorId: number;
  DoctorName: string;
}
interface IonSelectOption {
  Id: number;
  Name: string;
  label: string;
}
interface IonSelectAll {
  Id: number;
  Name: string;
}
const Patient: React.FC = () => {
  const [doctorName, setdoctorName] = useState("");
  const [paientName, setpaientName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error1, setError1] = useState(false);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [apiData, setApiData] = useState<IPatientProps[]>([]);
  const [error, setError] = useState("");
  const [showerrorCard, setShowErrorCard] = useState(false);
  const [options, setOptions] = useState<IonSelectOption[]>([]);
  const [all, setAll] = useState<IonSelectAll[]>([]);
  const clearApiData = () => {
    setApiData([]);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));

    fetch(`${import.meta.env.VITE_API_URL}api/Child/allpatients`)
      .then((response) => response.json())
      .then((data) => {
        setAll(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const performSearch = async () => {
    clearApiData();
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }api/Child/search-by-doctor-name?doctorName=${doctorName}&Name=${paientName}&City=${city}&Gender=${gender}&fromDay=${fromDate}&toDay=${toDate}&fromMonth=${fromMonth}&toMonth=${toMonth}&fromYear=${fromYear}&toYear=${toYear}`
      )
      .then((res) => {
        setApiData(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response) {
          setShowErrorCard(true);
          setError(err.response.data);
          setError1(true);
        } else {
          setShowErrorCard(true);
          setError(err.message);
          setError1(true);
        }
      })
      .finally(() => {
        setdoctorName(""),
          setpaientName(""),
          setDob(""),
          setGender(""),
          setCity(""),
          setFromDate(""),
          setToDate(""),
          setFromMonth(""),
          setToMonth(""),
          setFromYear(""),
          setToYear("");
      });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.preventDefault();
    performSearch();
    console.log(
      "Submitted:",
      doctorName,
      paientName,
      gender,
      city,
      fromDate,
      toDate,
      fromMonth,
      toMonth,
      fromYear,
      toYear
    );
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => 2000 + index
  );

  const canSubmit =
    doctorName.trim().length > 0 ||
    paientName.trim().length > 0 ||
    gender.trim().length > 0 ||
    city.trim().length > 0 ||
    fromDate.toString().length > 0 ||
    toDate.toString().length > 0 ||
    fromMonth.toString().trim().length > 0 ||
    toMonth.toString().trim().length > 0 ||
    fromYear.toString().trim().length > 0 ||
    toYear.toString().trim().length > 0;
  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Patient search successfully."
        color="success"
      />
      <Toast
        isOpen={error1}
        setOpen={setError1}
        message="An error occurred while patient search. plz try again"
        color="danger"
      />
      <IonPage>
        <HeaderButtons
          pageName="Patient Search"
          backbutton={true}
          backUrl="/members/dashboard"
        />
        <IonContent className="ion-padding">
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonSelect
                label="Doctor Name"
                value={doctorName} //@ts-ignore
                onIonChange={(e) => setdoctorName(e.detail.value)}
                labelPlacement="floating"
              >
                <IonSelectOption value="">Select Doctor Name</IonSelectOption>
                {options.map((option) => (
                  <IonSelectOption key={option.Id} value={option.Name}>
                    {option.Name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Patient Name"
                value={paientName} //@ts-ignore
                onIonChange={(e) => setpaientName(e.detail.value)}
                labelPlacement="floating"
              >
                <IonSelectOption value="">Select Patient Name</IonSelectOption>
                {all.map((option) => (
                  <IonSelectOption key={option.Id} value={option.Name}>
                    {option.Name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Gender"
                value={gender}
                //@ts-ignore
                onIonChange={(e) => setGender(e.detail.value)}
                labelPlacement="floating"
              >
                <IonSelectOption value="">Select Gender</IonSelectOption>
                <IonSelectOption value="0">Boy</IonSelectOption>
                <IonSelectOption value="1">Girl</IonSelectOption>
                <IonSelectOption value="2">Any</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="City"
                value={city}
                onIonChange={(e) => setCity(e.detail.value!)}
                labelPlacement="floating"
              >
                <IonSelectOption value="">Select City</IonSelectOption>
                <IonSelectOption value="Abbottabad">Abbottabad</IonSelectOption>
                <IonSelectOption value="Adezai">Adezai</IonSelectOption>
                <IonSelectOption value="Ali Bandar">Ali Bandar</IonSelectOption>
                <IonSelectOption value="Amir Chah">Amir Chah</IonSelectOption>
                <IonSelectOption value="Attock">Attock</IonSelectOption>
                <IonSelectOption value="Ayubia">Ayubia</IonSelectOption>
                <IonSelectOption value="Bahawalpur">Bahawalpur</IonSelectOption>
                <IonSelectOption value="Baden">Baden</IonSelectOption>
                <IonSelectOption value="Bagh">Bagh</IonSelectOption>
                <IonSelectOption value="Bahawalnagar">
                  Bahawalnagar
                </IonSelectOption>
                <IonSelectOption value="Burewala">Burewala</IonSelectOption>
                <IonSelectOption value="Banda Daud Shah">
                  Banda Daud Shah
                </IonSelectOption>
                <IonSelectOption value="Bannu district|Bannu">
                  Bannu
                </IonSelectOption>
                <IonSelectOption value="Batagram">Batagram</IonSelectOption>
                <IonSelectOption value="Bazdar">Bazdar</IonSelectOption>
                <IonSelectOption value="Bela">Bela</IonSelectOption>
                <IonSelectOption value="Bellpat">Bellpat</IonSelectOption>
                <IonSelectOption value="Bhag">Bhag</IonSelectOption>
                <IonSelectOption value="Bhakkar">Bhakkar</IonSelectOption>
                <IonSelectOption value="Bhalwal">Bhalwal</IonSelectOption>
                <IonSelectOption value="Bhimber">Bhimber</IonSelectOption>
                <IonSelectOption value="Birote">Birote</IonSelectOption>
                <IonSelectOption value="Buner">Buner</IonSelectOption>
                <IonSelectOption value="Burj">Burj</IonSelectOption>
                <IonSelectOption value="Chiniot">Chiniot</IonSelectOption>
                <IonSelectOption value="Chachro">Chachro</IonSelectOption>
                <IonSelectOption value="Chagai">Chagai</IonSelectOption>
                <IonSelectOption value="Chah Sandan">
                  Chah Sandan
                </IonSelectOption>
                <IonSelectOption value="Chailianwala">
                  Chailianwala
                </IonSelectOption>
                <IonSelectOption value="Chakdara">Chakdara</IonSelectOption>
                <IonSelectOption value="Chakku">Chakku</IonSelectOption>
                <IonSelectOption value="Chakwal">Chakwal</IonSelectOption>
                <IonSelectOption value="Chaman">Chaman</IonSelectOption>
                <IonSelectOption value="Charsadda">Charsadda</IonSelectOption>
                <IonSelectOption value="Chhatr">Chhatr</IonSelectOption>
                <IonSelectOption value="Chichawatni">
                  Chichawatni
                </IonSelectOption>
                <IonSelectOption value="Chitral">Chitral</IonSelectOption>
                <IonSelectOption value="Dadu">Dadu</IonSelectOption>
                <IonSelectOption value="Dera Ghazi Khan">
                  Dera Ghazi Khan
                </IonSelectOption>
                <IonSelectOption value="Dera Ismail Khan">
                  Dera Ismail Khan
                </IonSelectOption>
                <IonSelectOption value="Dalbandin">Dalbandin</IonSelectOption>
                <IonSelectOption value="Dargai">Dargai</IonSelectOption>
                <IonSelectOption value="Darya Khan">Darya Khan</IonSelectOption>
                <IonSelectOption value="Daska">Daska</IonSelectOption>
                <IonSelectOption value="Dera Bugti">Dera Bugti</IonSelectOption>
                <IonSelectOption value="Dhana Sar">Dhana Sar</IonSelectOption>
                <IonSelectOption value="Digri">Digri</IonSelectOption>
                <IonSelectOption value="Dina City|Dina">Dina</IonSelectOption>
                <IonSelectOption value="Dinga">Dinga</IonSelectOption>
                <IonSelectOption value="Diplo, Pakistan|Diplo">
                  Diplo
                </IonSelectOption>
                <IonSelectOption value="Diwana">Diwana</IonSelectOption>
                <IonSelectOption value="Dokri">Dokri</IonSelectOption>
                <IonSelectOption value="Drosh">Drosh</IonSelectOption>
                <IonSelectOption value="Duki">Duki</IonSelectOption>
                <IonSelectOption value="Dushi">Dushi</IonSelectOption>
                <IonSelectOption value="Duzab">Duzab</IonSelectOption>
                <IonSelectOption value="Faisalabad">Faisalabad</IonSelectOption>
                <IonSelectOption value="Fateh Jang">Fateh Jang</IonSelectOption>
                <IonSelectOption value="Ghotki">Ghotki</IonSelectOption>
                <IonSelectOption value="Gwadar">Gwadar</IonSelectOption>
                <IonSelectOption value="Gujranwala">Gujranwala</IonSelectOption>
                <IonSelectOption value="Gujrat">Gujrat</IonSelectOption>
                <IonSelectOption value="Gadra">Gadra</IonSelectOption>
                <IonSelectOption value="Gajar">Gajar</IonSelectOption>
                <IonSelectOption value="Gandava">Gandava</IonSelectOption>
                <IonSelectOption value="Garhi Khairo">
                  Garhi Khairo
                </IonSelectOption>
                <IonSelectOption value="Garruck">Garruck</IonSelectOption>
                <IonSelectOption value="Ghakhar Mandi">
                  Ghakhar Mandi
                </IonSelectOption>
                <IonSelectOption value="Ghanian">Ghanian</IonSelectOption>
                <IonSelectOption value="Ghauspur">Ghauspur</IonSelectOption>
                <IonSelectOption value="Ghazluna">Ghazluna</IonSelectOption>
                <IonSelectOption value="Girdan">Girdan</IonSelectOption>
                <IonSelectOption value="Gulistan">Gulistan</IonSelectOption>
                <IonSelectOption value="Gwash">Gwash</IonSelectOption>
                <IonSelectOption value="Hyderabad">Hyderabad</IonSelectOption>
                <IonSelectOption value="Hala">Hala</IonSelectOption>
                <IonSelectOption value="Haripur">Haripur</IonSelectOption>
                <IonSelectOption value="Hab Chauki">Hab Chauki</IonSelectOption>
                <IonSelectOption value="Hafizabad">Hafizabad</IonSelectOption>
                <IonSelectOption value="Hameedabad">Hameedabad</IonSelectOption>
                <IonSelectOption value="Hangu">Hangu</IonSelectOption>
                <IonSelectOption value="Harnai">Harnai</IonSelectOption>
                <IonSelectOption value="Hasilpur">Hasilpur</IonSelectOption>
                <IonSelectOption value="Haveli Lakha">
                  Haveli Lakha
                </IonSelectOption>
                <IonSelectOption value="Hinglaj">Hinglaj</IonSelectOption>
                <IonSelectOption value="Hoshab">Hoshab</IonSelectOption>
                <IonSelectOption value="Islamabad">Islamabad</IonSelectOption>
                <IonSelectOption value="Islamkot">Islamkot</IonSelectOption>
                <IonSelectOption value="Ispikan">Ispikan</IonSelectOption>
                <IonSelectOption value="Jacobabad">Jacobabad</IonSelectOption>
                <IonSelectOption value="Jamshoro">Jamshoro</IonSelectOption>
                <IonSelectOption value="Jhang">Jhang</IonSelectOption>
                <IonSelectOption value="Jhelum">Jhelum</IonSelectOption>
                <IonSelectOption value="Jamesabad">Jamesabad</IonSelectOption>
                <IonSelectOption value="Jampur">Jampur</IonSelectOption>
                <IonSelectOption value="Janghar">Janghar</IonSelectOption>
                <IonSelectOption value="Jati, Jati(Mughalbhin)">
                  Jati
                </IonSelectOption>
                <IonSelectOption value="Jauharabad">Jauharabad</IonSelectOption>
                <IonSelectOption value="Jhal">Jhal</IonSelectOption>
                <IonSelectOption value="Jhal Jhao">Jhal Jhao</IonSelectOption>
                <IonSelectOption value="Jhatpat">Jhatpat</IonSelectOption>
                <IonSelectOption value="Jhudo">Jhudo</IonSelectOption>
                <IonSelectOption value="Jiwani">Jiwani</IonSelectOption>
                <IonSelectOption value="Jungshahi">Jungshahi</IonSelectOption>
                <IonSelectOption value="Karachi">Karachi</IonSelectOption>
                <IonSelectOption value="Kotri">Kotri</IonSelectOption>
                <IonSelectOption value="Kalam">Kalam</IonSelectOption>
                <IonSelectOption value="Kalandi">Kalandi</IonSelectOption>
                <IonSelectOption value="Kalat">Kalat</IonSelectOption>
                <IonSelectOption value="Kamalia">Kamalia</IonSelectOption>
                <IonSelectOption value="Kamararod">Kamararod</IonSelectOption>
                <IonSelectOption value="Kamber">Kamber</IonSelectOption>
                <IonSelectOption value="Kamokey">Kamokey</IonSelectOption>
                <IonSelectOption value="Kanak">Kanak</IonSelectOption>
                <IonSelectOption value="Kandi">Kandi</IonSelectOption>
                <IonSelectOption value="Kandiaro">Kandiaro</IonSelectOption>
                <IonSelectOption value="Kanpur">Kanpur</IonSelectOption>
                <IonSelectOption value="Kapip">Kapip</IonSelectOption>
                <IonSelectOption value="Kappar">Kappar</IonSelectOption>
                <IonSelectOption value="Karak City">Karak City</IonSelectOption>
                <IonSelectOption value="Karodi">Karodi</IonSelectOption>
                <IonSelectOption value="Kashmor">Kashmor</IonSelectOption>
                <IonSelectOption value="Kasur">Kasur</IonSelectOption>
                <IonSelectOption value="Katuri">Katuri</IonSelectOption>
                <IonSelectOption value="Keti Bandar">
                  Keti Bandar
                </IonSelectOption>
                <IonSelectOption value="Khairpur">Khairpur</IonSelectOption>
                <IonSelectOption value="Khanaspur">Khanaspur</IonSelectOption>
                <IonSelectOption value="Khanewal">Khanewal</IonSelectOption>
                <IonSelectOption value="Kharan">Kharan</IonSelectOption>
                <IonSelectOption value="kharian">kharian</IonSelectOption>
                <IonSelectOption value="Khokhropur">Khokhropur</IonSelectOption>
                <IonSelectOption value="Khora">Khora</IonSelectOption>
                <IonSelectOption value="Khushab">Khushab</IonSelectOption>
                <IonSelectOption value="Khuzdar">Khuzdar</IonSelectOption>
                <IonSelectOption value="Kikki">Kikki</IonSelectOption>
                <IonSelectOption value="Klupro">Klupro</IonSelectOption>
                <IonSelectOption value="Kohan">Kohan</IonSelectOption>
                <IonSelectOption value="Kohat">Kohat</IonSelectOption>
                <IonSelectOption value="Kohistan">Kohistan</IonSelectOption>
                <IonSelectOption value="Kohlu">Kohlu</IonSelectOption>
                <IonSelectOption value="Korak">Korak</IonSelectOption>
                <IonSelectOption value="Korangi">Korangi</IonSelectOption>
                <IonSelectOption value="Kot Sarae">Kot Sarae</IonSelectOption>
                <IonSelectOption value="Kotli">Kotli</IonSelectOption>
                <IonSelectOption value="Lahore">Lahore</IonSelectOption>
                <IonSelectOption value="Larkana">Larkana</IonSelectOption>
                <IonSelectOption value="Lahri">Lahri</IonSelectOption>
                <IonSelectOption value="Lakki Marwat">
                  Lakki Marwat
                </IonSelectOption>
                <IonSelectOption value="Lasbela">Lasbela</IonSelectOption>
                <IonSelectOption value="Latamber">Latamber</IonSelectOption>
                <IonSelectOption value="Layyah">Layyah</IonSelectOption>
                <IonSelectOption value="Leiah">Leiah</IonSelectOption>
                <IonSelectOption value="Liari">Liari</IonSelectOption>
                <IonSelectOption value="Lodhran">Lodhran</IonSelectOption>
                <IonSelectOption value="Loralai">Loralai</IonSelectOption>
                <IonSelectOption value="Lower Dir">Lower Dir</IonSelectOption>
                <IonSelectOption value="Shadan Lund">
                  Shadan Lund
                </IonSelectOption>
                <IonSelectOption value="Multan">Multan</IonSelectOption>
                <IonSelectOption value="Mandi Bahauddin">
                  Mandi Bahauddin
                </IonSelectOption>
                <IonSelectOption value="Mansehra">Mansehra</IonSelectOption>
                <IonSelectOption value="Mian Chanu">Mian Chanu</IonSelectOption>
                <IonSelectOption value="Mirpur">Mirpur</IonSelectOption>
                <IonSelectOption value="Moro, Pakistan|Moro">
                  Moro
                </IonSelectOption>
                <IonSelectOption value="Mardan">Mardan</IonSelectOption>
                <IonSelectOption value="Mach">Mach</IonSelectOption>
                <IonSelectOption value="Madyan">Madyan</IonSelectOption>
                <IonSelectOption value="Malakand">Malakand</IonSelectOption>
                <IonSelectOption value="Mand">Mand</IonSelectOption>
                <IonSelectOption value="Manguchar">Manguchar</IonSelectOption>
                <IonSelectOption value="Mashki Chah">
                  Mashki Chah
                </IonSelectOption>
                <IonSelectOption value="Maslti">Maslti</IonSelectOption>
                <IonSelectOption value="Mastuj">Mastuj</IonSelectOption>
                <IonSelectOption value="Mastung">Mastung</IonSelectOption>
                <IonSelectOption value="Mathi">Mathi</IonSelectOption>
                <IonSelectOption value="Matiari">Matiari</IonSelectOption>
                <IonSelectOption value="Mehar">Mehar</IonSelectOption>
                <IonSelectOption value="Mekhtar">Mekhtar</IonSelectOption>
                <IonSelectOption value="Merui">Merui</IonSelectOption>
                <IonSelectOption value="Mianwali">Mianwali</IonSelectOption>
                <IonSelectOption value="Mianez">Mianez</IonSelectOption>
                <IonSelectOption value="Mirpur Batoro">
                  Mirpur Batoro
                </IonSelectOption>
                <IonSelectOption value="Mirpur Khas">
                  Mirpur Khas
                </IonSelectOption>
                <IonSelectOption value="Mirpur Sakro">
                  Mirpur Sakro
                </IonSelectOption>
                <IonSelectOption value="Mithi">Mithi</IonSelectOption>
                <IonSelectOption value="Mongora">Mongora</IonSelectOption>
                <IonSelectOption value="Murgha Kibzai">
                  Murgha Kibzai
                </IonSelectOption>
                <IonSelectOption value="Muridke">Muridke</IonSelectOption>
                <IonSelectOption value="Musa Khel Bazar">
                  Musa Khel Bazar
                </IonSelectOption>
                <IonSelectOption value="Muzaffar Garh">
                  Muzaffar Garh
                </IonSelectOption>
                <IonSelectOption value="Muzaffarabad">
                  Muzaffarabad
                </IonSelectOption>
                <IonSelectOption value="Nawabshah">Nawabshah</IonSelectOption>
                <IonSelectOption value="Nazimabad">Nazimabad</IonSelectOption>
                <IonSelectOption value="Nowshera">Nowshera</IonSelectOption>
                <IonSelectOption value="Nagar Parkar">
                  Nagar Parkar
                </IonSelectOption>
                <IonSelectOption value="Nagha Kalat">
                  Nagha Kalat
                </IonSelectOption>
                <IonSelectOption value="Nal">Nal</IonSelectOption>
                <IonSelectOption value="Naokot">Naokot</IonSelectOption>
                <IonSelectOption value="Nasirabad">Nasirabad</IonSelectOption>
                <IonSelectOption value="Nauroz Kalat">
                  Nauroz Kalat
                </IonSelectOption>
                <IonSelectOption value="Naushara">Naushara</IonSelectOption>
                <IonSelectOption value="Nur Gamma">Nur Gamma</IonSelectOption>
                <IonSelectOption value="Nushki">Nushki</IonSelectOption>
                <IonSelectOption value="Nuttal">Nuttal</IonSelectOption>
                <IonSelectOption value="Okara">Okara</IonSelectOption>
                <IonSelectOption value="Ormara">Ormara</IonSelectOption>
                <IonSelectOption value="Peshawar">Peshawar</IonSelectOption>
                <IonSelectOption value="Panjgur">Panjgur</IonSelectOption>
                <IonSelectOption value="Pasni City">Pasni City</IonSelectOption>
                <IonSelectOption value="Paharpur">Paharpur</IonSelectOption>
                <IonSelectOption value="Palantuk">Palantuk</IonSelectOption>
                <IonSelectOption value="Pendoo">Pendoo</IonSelectOption>
                <IonSelectOption value="Piharak">Piharak</IonSelectOption>
                <IonSelectOption value="Pirmahal">Pirmahal</IonSelectOption>
                <IonSelectOption value="Pishin">Pishin</IonSelectOption>
                <IonSelectOption value="Plandri">Plandri</IonSelectOption>
                <IonSelectOption value="Pokran">Pokran</IonSelectOption>
                <IonSelectOption value="Pounch">Pounch</IonSelectOption>
                <IonSelectOption value="Quetta">Quetta</IonSelectOption>
                <IonSelectOption value="Qambar">Qambar</IonSelectOption>
                <IonSelectOption value="Qamruddin Karez">
                  Qamruddin Karez
                </IonSelectOption>
                <IonSelectOption value="Qazi Ahmad">Qazi Ahmad</IonSelectOption>
                <IonSelectOption value="Qila Abdullah">
                  Qila Abdullah
                </IonSelectOption>
                <IonSelectOption value="Qila Ladgasht">
                  Qila Ladgasht
                </IonSelectOption>
                <IonSelectOption value="Qila Safed">Qila Safed</IonSelectOption>
                <IonSelectOption value="Qila Saifullah">
                  Qila Saifullah
                </IonSelectOption>
                <IonSelectOption value="Rawalpindi">Rawalpindi</IonSelectOption>
                <IonSelectOption value="Rabwah">Rabwah</IonSelectOption>
                <IonSelectOption value="Rahim Yar Khan">
                  Rahim Yar Khan
                </IonSelectOption>
                <IonSelectOption value="Rajan Pur">Rajan Pur</IonSelectOption>
                <IonSelectOption value="Rakhni">Rakhni</IonSelectOption>
                <IonSelectOption value="Ranipur">Ranipur</IonSelectOption>
                <IonSelectOption value="Ratodero">Ratodero</IonSelectOption>
                <IonSelectOption value="Rawalakot">Rawalakot</IonSelectOption>
                <IonSelectOption value="Renala Khurd">
                  Renala Khurd
                </IonSelectOption>
                <IonSelectOption value="Robat Thana">
                  Robat Thana
                </IonSelectOption>
                <IonSelectOption value="Rodkhan">Rodkhan</IonSelectOption>
                <IonSelectOption value="Rohri">Rohri</IonSelectOption>
                <IonSelectOption value="Sialkot">Sialkot</IonSelectOption>
                <IonSelectOption value="Sadiqabad">Sadiqabad</IonSelectOption>
                <IonSelectOption value="Safdar Abad- (Dhaban Singh)">
                  SafdarAbad
                </IonSelectOption>
                <IonSelectOption value="Sahiwal">Sahiwal</IonSelectOption>
                <IonSelectOption value="Saidu Sharif">
                  Saidu Sharif
                </IonSelectOption>
                <IonSelectOption value="Saindak">Saindak</IonSelectOption>
                <IonSelectOption value="Sakrand">Sakrand</IonSelectOption>
                <IonSelectOption value="Sanjawi">Sanjawi</IonSelectOption>
                <IonSelectOption value="Sargodha">Sargodha</IonSelectOption>
                <IonSelectOption value="Saruna">Saruna</IonSelectOption>
                <IonSelectOption value="Shabaz Kalat">
                  Shabaz Kalat
                </IonSelectOption>
                <IonSelectOption value="Shadadkhot">Shadadkhot</IonSelectOption>
                <IonSelectOption value="Shahbandar">Shahbandar</IonSelectOption>
                <IonSelectOption value="Shahpur">Shahpur</IonSelectOption>
                <IonSelectOption value="Shahpur Chakar">
                  Shahpur Chakar
                </IonSelectOption>
                <IonSelectOption value="Shakargarh">Shakargarh</IonSelectOption>
                <IonSelectOption value="Shangla">Shangla</IonSelectOption>
                <IonSelectOption value="Sharam Jogizai">
                  Sharam Jogizai
                </IonSelectOption>
                <IonSelectOption value="Sheikhupura">
                  Sheikhupura
                </IonSelectOption>
                <IonSelectOption value="Shikarpur">Shikarpur</IonSelectOption>
                <IonSelectOption value="Shingar">Shingar</IonSelectOption>
                <IonSelectOption value="Shorap">Shorap</IonSelectOption>
                <IonSelectOption value="Sibi">Sibi</IonSelectOption>
                <IonSelectOption value="Sohawa">Sohawa</IonSelectOption>
                <IonSelectOption value="Sonmiani">Sonmiani</IonSelectOption>
                <IonSelectOption value="Sooianwala">Sooianwala</IonSelectOption>
                <IonSelectOption value="Spezand">Spezand</IonSelectOption>
                <IonSelectOption value="Spintangi">Spintangi</IonSelectOption>
                <IonSelectOption value="Sui">Sui</IonSelectOption>
                <IonSelectOption value="Sujawal">Sujawal</IonSelectOption>
                <IonSelectOption value="Sukkur">Sukkur</IonSelectOption>
                <IonSelectOption value="Suntsar">Suntsar</IonSelectOption>
                <IonSelectOption value="Surab">Surab</IonSelectOption>
                <IonSelectOption value="Swabi">Swabi</IonSelectOption>
                <IonSelectOption value="Swat">Swat</IonSelectOption>
                <IonSelectOption value="Tando Adam">Tando Adam</IonSelectOption>
                <IonSelectOption value="Tando Bago">Tando Bago</IonSelectOption>
                <IonSelectOption value="Tangi">Tangi</IonSelectOption>
                <IonSelectOption value="Tank City">Tank City</IonSelectOption>
                <IonSelectOption value="Tar Ahamd Rind">
                  Tar Ahamd Rind
                </IonSelectOption>
                <IonSelectOption value="Thalo">Thalo</IonSelectOption>
                <IonSelectOption value="Thatta">Thatta</IonSelectOption>
                <IonSelectOption value="Toba Tek Singh">
                  Toba Tek Singh
                </IonSelectOption>
                <IonSelectOption value="Tordher">Tordher</IonSelectOption>
                <IonSelectOption value="Tujal">Tujal</IonSelectOption>
                <IonSelectOption value="Tump">Tump</IonSelectOption>
                <IonSelectOption value="Turbat">Turbat</IonSelectOption>
                <IonSelectOption value="Umarao">Umarao</IonSelectOption>
                <IonSelectOption value="Umarkot">Umarkot</IonSelectOption>
                <IonSelectOption value="Upper Dir">Upper Dir</IonSelectOption>
                <IonSelectOption value="Uthal">Uthal</IonSelectOption>
                <IonSelectOption value="Vehari">Vehari</IonSelectOption>
                <IonSelectOption value="Veirwaro">Veirwaro</IonSelectOption>
                <IonSelectOption value="Vitakri">Vitakri</IonSelectOption>
                <IonSelectOption value="Wadh">Wadh</IonSelectOption>
                <IonSelectOption value="Wah Cantt">Wah Cantt</IonSelectOption>
                <IonSelectOption value="Warah">Warah</IonSelectOption>
                <IonSelectOption value="Washap">Washap</IonSelectOption>
                <IonSelectOption value="Wasjuk">Wasjuk</IonSelectOption>
                <IonSelectOption value="Wazirabad">Wazirabad</IonSelectOption>
                <IonSelectOption value="Yakmach">Yakmach</IonSelectOption>
                <IonSelectOption value="Zhob">Zhob</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="From Date"
                    value={fromDate}
                    onIonChange={(e) => setFromDate(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Day</IonSelectOption>
                    {Array.from({ length: 31 }, (_, index) => (
                      <IonSelectOption key={index + 1} value={index + 1}>
                        {index + 1}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="To Date"
                    value={toDate}
                    onIonChange={(e) => setToDate(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Day</IonSelectOption>
                    {Array.from({ length: 31 }, (_, index) => (
                      <IonSelectOption key={index + 1} value={index + 1}>
                        {index + 1}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="From Month"
                    value={fromMonth}
                    onIonChange={(e) => setFromMonth(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Month</IonSelectOption>
                    {monthNames.map((month, index) => (
                      <IonSelectOption key={index + 1} value={index + 1}>
                        {month}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="To Month"
                    value={toMonth}
                    //@ts-ignore
                    onIonChange={(e) => setToMonth(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Month</IonSelectOption>
                    {monthNames.map((month, index) => (
                      <IonSelectOption key={index + 1} value={index + 1}>
                        {month}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="From Year"
                    value={fromYear}
                    onIonChange={(e) => setFromYear(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Year</IonSelectOption>
                    {years.map((year) => (
                      <IonSelectOption key={year} value={year}>
                        {year}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonSelect
                    label="To Year"
                    value={toYear}
                    onIonChange={(e) => setToYear(e.detail.value!)}
                    labelPlacement="floating"
                  >
                    <IonSelectOption value="">Select Year</IonSelectOption>
                    {years.map((year) => (
                      <IonSelectOption key={year} value={year}>
                        {year}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonButton type="submit" expand="block" disabled={!canSubmit}>
              Search
            </IonButton>
          </form>
          <div>
            {apiData.length > 0 ? (
              <>
                {apiData.map((entity, index) => (
                  <div key={index}>
                    <IonCard>
                      <IonCardContent>
                        <IonText
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 700,
                            fontSize: 19,
                            borderBottom: "1px solid gray",
                          }}
                        >
                          Name: {entity.Name}
                        </IonText>
                        {/* <IonItem>Guardian: {entity.Guardian}</IonItem> */}
                        <IonItem>Father name: {entity.FatherName}</IonItem>
                        <IonItem>Email: {entity.Email}</IonItem>
                        <IonItem>DOB: {entity.DOB.split("T")[0]}</IonItem>
                        <IonItem>
                          Gender: {entity.Gender == 0 ? "Boy" : "Girl"}
                        </IonItem>
                        {/* <IonItem>Type: {entity.Type}</IonItem> */}
                        <IonItem>City: {entity.City}</IonItem>
                        <IonItem>CNIC: {entity.CNIC}</IonItem>
                        <IonItem>Mobile Number: {entity.MobileNumber}</IonItem>
                        {/* <IonItem lines="none">
                        Preferred schedule: {entity.PreferredSchedule}
                      </IonItem> */}
                      </IonCardContent>
                    </IonCard>
                  </div>
                ))}
              </>
            ) : null}
            {showerrorCard && error && apiData.length === 0 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Error</IonCardTitle>
                  <IonCardSubtitle>{error}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            )}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Patient;
