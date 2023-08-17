import React, { useState } from "react";
import {
  IonDatetime,
  IonIcon,
  // IonItem,
  IonPopover,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { calendar } from "ionicons/icons";

// import AlertError from "../alerts/AlertError";
// import AlertSuccess from "../alerts/AlertSuccess";
import { format } from "date-fns";
import Toast from "../Custom Toast/Toast";

interface IDoseSchedule {
  key:string,
  date: any,
  data:any,
  renderList: () => void
}

const Schedulecard: React.FC<IDoseSchedule> = ({
  // Name,
  // Id,
  // key,
  date,
  data,
  renderList,
}) => {
  const [error, setError] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(date); // Initialize with the `date` prop value
  const [showPopover2, setShowPopover2] = useState(false);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState("");
  const [singleId,setSingleId] = useState('');

  const handelonmouseover2 = (inputValue: string) => {
        // const data1 = inputValue.split("T");
        const data2 = format(new Date(inputValue), "yyyy-MM-dd");
        setValue(data2);
        setSelectedDate(data2);
      };
    
      const handleDateChange2 = async (
        event: CustomEvent,
        key: string,
        inputValue: string
      ) => {
        console.log(value);
        closePopover();
        const data = event.detail.value;
        // const data1 = data.split("T");
        // const data2 = data1[0];
        // console.log(data2);
    console.log(data)
        console.log(event.detail.value);
    
        // const dataTobeSent = [
        //   {
        //     path: "Date",
        //     op: "replace",
        //     from: value,
        //     value: data2,
        //   },
        // ];
    
        // console.log("object item date : ", dataTobeSent);
        try {
          // setShowLoading(true);
          const response = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }api/AdminSchedule/admin_bulk_update_Date?oldDate=${value}&newDate=${data}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify(dataTobeSent),
            }
          );
          console.log(
            `${
              import.meta.env.VITE_API_URL
            }api/AdminSchedule/admin_bulk_update_Date?oldDate=${value}&newDate=${data}`
          );
          if (response.status === 204) {
            // setShowLoading(false);
            console.log(response.ok);
            setSuccess(true);
            renderList();
          } else if (!response.ok) {
            setError(true);
            // setShowLoading(false);
          }
        } catch (error) {
          console.error(error);
          setError(true);
          // setShowLoading(false);
        }
      };


  // const handelonmouseover2 = (inputValue: string) => {
  //   // const data1 = inputValue.split("T");
  //   const data2 = format(new Date(inputValue), "yyyy-MM-dd");
  //   console.log(data2)
  //   setValue(data2);
  //   setSelectedDate(data2);
  // };

  // const handleDateChange2 = async (
  //   event: CustomEvent,
  //   key: string,
  //   value: string
  // ) => {
  //   console.log(value);
  //   closePopover();
  //   const data = event.detail.value;
  //   // const data1 = data.split("T");
  //   // const data2 = data1[0];
  //   // console.log(data2);

  //   console.log(event.detail.value);

  //   // const dataTobeSent = [
  //   //   {
  //   //     path: "Date",
  //   //     op: "replace",
  //   //     from: value,
  //   //     value: data,
  //   //   },
  //   // ];

  //   // console.log("object item date : ", dataTobeSent);
  //   try {
  //     // setShowLoading(true);
  //     const response = await fetch(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }api/DoctorSchedule/doctor_bulk_update_Date?DoctorId=${storedValue.Id}&oldDate=${value}&newDate=${data}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify(dataTobeSent),
  //       }
  //     );
  //     if (response.status === 204) {
  //       console.log(response.ok);
  //       renderList();
  //       setSuccess(true);
  //       // setShowLoading(false);
  //     } else if (!response.ok) {
  //       setError(true);
  //       // setShowLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError(true);
  //     // setShowLoading(false);
  //   }
  // };


  const handelonmouseover = (inputValue: string,Id: string) => {
    // const data1 = inputValue.split("T");
    const data2 = format(new Date(inputValue), "yyyy-MM-dd");
    setSingleId(Id);
    setSelectedDate(data2);
  };
  const handleDateChange = async (event: CustomEvent<any>) => {
    const selectedValue = event.detail.value;
    console.log(selectedValue);
    const dataTobeSent = {
      date: selectedValue,
      doseId: singleId,
    };
    console.log(dataTobeSent);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/AdminSchedule/Admin_single_updateDate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.ok) {
        setSuccess(true);
        renderList();
        setShowPopover(false);
      } else {
        setError(true);
        renderList();
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setShowPopover(false);
    }
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const closePopover2 = () => {
    setShowPopover2(false);
  };

  return (
    <>
     <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Date updated successfully"
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="an Error occurred while updating date, please try again later"
        color="danger"
      />
      <IonCard>
        <>
          <IonItem lines="none" className="centered-item">
            <IonLabel style={{ textAlign: "center" }}>
              <IonItem
                lines="none"
                slot="center"
                style={{ textAlign: "center", padding: 0 }}
              >
                <IonIcon
                  color="primary"
                  onClick={() => setShowPopover2(true)}
                  icon={calendar}
                  style={{ marginRight: "10px", PointerEvent: "cursor" }}
                  onMouseOver={() => handelonmouseover2(date)}
                  id="bulk"
                />
                {/* <IonText>{format(new Date(date), "yyyy-MM-dd")}</IonText> */}
                <IonText>{date}</IonText>
                <IonPopover isOpen={showPopover2} onDidDismiss={closePopover2}>
                  <IonDatetime
                    placeholder="Select Date"
                    value={selectedDate || undefined}
                    onIonChange={(e) =>
                      handleDateChange2(e, date, value)
                    }
                  ></IonDatetime>
                </IonPopover>
              </IonItem>
            </IonLabel>
          </IonItem>
          {data.map((item: any) =>
            item !== null ? (
              <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <b>{item.Name}</b>
          </IonCol>
          <IonCol size="auto">
            <>
              <IonIcon
                color="primary"
                onClick={() => setShowPopover(true)}
                icon={calendar}
                style={{ marginRight: "10px", cursor: "pointer" }}
                onMouseOver={() => handelonmouseover(date,item.Id)}
                id="single"
              />
            </>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
        <IonDatetime
          placeholder="Select Date"
          value={selectedDate}
          onIonChange={handleDateChange}
        ></IonDatetime>
      </IonPopover>
      </>
            ) : (
              ""
            )
          )}
        </>
      </IonCard>
    </>
  );
};

export default Schedulecard;
