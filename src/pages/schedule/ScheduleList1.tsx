import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
} from "@ionic/react";
import { groupBy } from "lodash";
import { calendar } from "ionicons/icons";
import HeaderButtons from "../../components/HeaderButtons";
import Schedulecard from "../../components/Schedule-card/Schedulecard";
import { useLocation } from "react-router";
// import { format } from "date-fns";
// import MyDatePicker from "../../components/datepicker/MyDatePicker";
// import DoctorScheduleCard from "./DoctorScheduleCard";
// import Header from "../../components/header/Header";
// import Toast from "../../components/custom-toast/Toast";
interface IVaccine {
  Id: number;
  Name: string;
  MinAge: number;
  VaccineId: number;
}

interface IVaccineData {
  [date: string]: IVaccine[];
}
//@ts-ignore
const storedValue = JSON.parse(sessionStorage.getItem("docData"));
console.log(storedValue);

const DoctorScheduleCardList: React.FC = () => {
  const [data, setData] = useState<IVaccine[]>([]);
  const [groupedData, setGroupedData] = useState<IVaccineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [renderList, setRenderList] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();
  const forceRender = () => {
    fetchDoseData();
  };

  useEffect(() => {
    fetchDoseData();
    // window.location.reload();
  }, [location]);

  const fetchDoseData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/AdminSchedule/admin_post_doseSchedule`
      );
      if (response.ok) {
        const data = await response.json();
        setShowLoading(true);
        setData(data);
        console.log(data);
        setIsLoading(false);
      } else {
        console.log("Error fetching data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <IonPage>
        <HeaderButtons
          pageName="Dose Schedule"
          Showbutton={false}
          backbutton={true}
          backUrl="/members/dashboard"
        />
        <IonContent className="ion-padding">
          {Object.keys(data).map((date) => (
            <Schedulecard
              key={date}
              date={date}
              //@ts-ignore
              data={data[date]}
              renderList={forceRender}
            />
          ))}
        </IonContent>
      </IonPage>
    </>
  );
};

export default DoctorScheduleCardList;

// import React, { useEffect, useState } from "react";
// import {
//   IonCard,
//   // IonCol,
//   IonContent,
//   IonDatetime,
//   // IonGrid,
//   IonIcon,
//   IonItem,
//   IonLabel,
//   IonPage,
//   IonPopover,
//   // IonRow,
//   IonText,
// } from "@ionic/react";
// // import { groupBy } from "lodash";
// import Schedulecard from "../../components/Schedule-card/Schedulecard";
// import HeaderButtons from "../../components/HeaderButtons";
// import AlertError from "../../components/alerts/AlertError";
// import AlertSuccess from "../../components/alerts/AlertSuccess";
// import { calendar } from "ionicons/icons";
// import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
// import { format } from "date-fns";
// import ErrorComponent from "../../components/error-component/ErrorComponent";
// import Toast from "../../components/Custom Toast/Toast";
// // import DatePicker from "../../components/Date Picker/MyDatePicker";
// interface IVaccine {
//   Id: number;
//   Name: string;
//   MinAge: number;
//   VaccineId: number;
// }

// interface IVaccineData {
//   [date: string]: IVaccine[];
// }

// const ScheduleList1: React.FC = () => {
//   const [data, setData] = useState<IVaccine[]>([]);
//   const [groupedData, setGroupedData] = useState<IVaccineData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);
//   const [showPopover, setShowPopover] = useState(false);
//   const [renderList, setRenderList] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [inputValue, setInputValue] = useState("");
//   const [value, setValue] = useState("");
//   const [showLoading, setShowLoading] = useState(false);

//   const forceRender = () => {
//     fetchDoseData();
//   };

//   useEffect(() => {
//     fetchDoseData();
//   }, []);

//   const fetchDoseData = async () => {
//     try {
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_API_URL
//         }api/AdminSchedule/admin_post_doseSchedule`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setShowLoading(true);
//         setData(data);
//         console.log(data);
//         setIsLoading(false);
//       } else {
//         console.log("Error fetching data");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       setIsLoading(false);
//     }
//   };

//   const handelonmouseover = (inputValue: string) => {
//     // const data1 = inputValue.split("T");
//     const data2 = format(new Date(inputValue), "yyyy-MM-dd");
//     setValue(data2);
//     setSelectedDate(data2);
//   };

//   const handleDateChange = async (
//     event: CustomEvent,
//     key: string,
//     inputValue: string
//   ) => {
//     console.log(value);
//     closePopover();
//     const data = event.detail.value;
//     // const data1 = data.split("T");
//     // const data2 = data1[0];
//     // console.log(data2);
// console.log(data)
//     console.log(event.detail.value);

//     // const dataTobeSent = [
//     //   {
//     //     path: "Date",
//     //     op: "replace",
//     //     from: value,
//     //     value: data2,
//     //   },
//     // ];

//     // console.log("object item date : ", dataTobeSent);
//     try {
//       setShowLoading(true);
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_API_URL
//         }api/AdminSchedule/admin_bulk_update_Date?oldDate=${value}&newDate=${data}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           // body: JSON.stringify(dataTobeSent),
//         }
//       );
//       console.log(
//         `${
//           import.meta.env.VITE_API_URL
//         }api/AdminSchedule/admin_bulk_update_Date?oldDate=${value}&newDate=${data}`
//       );
//       if (response.status === 204) {
//         setShowLoading(false);
//         console.log(response.ok);
//         setSuccess(true);
//         forceRender();
//       } else if (!response.ok) {
//         setError(true);
//         setShowLoading(false);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(true);
//       setShowLoading(false);
//     }
//   };

//   const openPopover = () => {
//     setShowPopover(true);
//   };

//   const closePopover = () => {
//     setShowPopover(false);
//   };

//   return (
//     <>
//       <LoadingSpinner
//         isOpen={showLoading}
//         setOpen={setShowLoading}
//         time={3000}
//       />
//       <Toast
//         isOpen={success}
//         setOpen={setSuccess}
//         message="Bulk date of admin schedule update successfully."
//         color="success"
//       />
//       <Toast
//         isOpen={error}
//         setOpen={setError}
//         message="An error occurred while update bulk date of admin schedule. plz try again"
//         color="danger"
//       />
//       {/* <AlertSuccess
//         isOpen={success}
//         setOpen={setSuccess}
//         message="Selected dose date updated successfully"
//       />
//       <AlertError
//         isOpen={error}
//         setOpen={setError}
//         message="An error occurred. Please try again."
//       /> */}
//       <IonPage>
//         <HeaderButtons
//           pageName="Dose Schedule"
//           Showbutton={false}
//           backbutton={true}
//           url="/members/schedule"
//         />
//         <IonContent className="ion-padding">
//           {Object.keys(data).map((date) => (
//             <IonCard key={date}>
//               <>
//                 <IonItem lines="none" className="centered-item">
//                   <IonLabel style={{ textAlign: "center" }}>
//                     <IonItem
//                       lines="none"
//                       slot="center"
//                       style={{ textAlign: "center", padding: 0 }}
//                     >
//                       <IonIcon
//                         color="primary"
//                         onClick={() => setShowPopover(true)}
//                         icon={calendar}
//                         style={{ marginRight: "10px", cursor: "pointer" }}
//                         onMouseOver={() => handelonmouseover(date)}
//                       />
//                       <IonText>{format(new Date(date), "yyyy-MM-dd")}</IonText>
//                       <IonPopover
//                         isOpen={showPopover}
//                         onDidDismiss={closePopover}
//                       >
//                         <IonDatetime
//                           placeholder="Select Date"
//                           value={selectedDate || undefined}
//                           onIonChange={(e) =>
//                             handleDateChange(e, date, inputValue)
//                           }
//                         ></IonDatetime>
//                       </IonPopover>
//                     </IonItem>
//                   </IonLabel>
//                 </IonItem>
//                 {data && data[date] ? (
//                   data[date].length > 0 ? (
//                     data[date].map((item: IVaccine) =>
//                       item !== null ? (
//                         <Schedulecard
//                           key={item.Id}
//                           date={date}
//                           Id={item.Id}
//                           Name={item.Name}
//                           MinAge={item.MinAge}
//                           VaccineId={item.VaccineId}
//                           renderList={forceRender}
//                         />
//                       ) : (
//                         ""
//                       )
//                     )
//                   ) : (
//                     <ErrorComponent title="Admin Schedule" />
//                   )
//                 ) : (
//                   <ErrorComponent title="Brands" />
//                 )}
//               </>
//             </IonCard>
//           ))}
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default ScheduleList1;
