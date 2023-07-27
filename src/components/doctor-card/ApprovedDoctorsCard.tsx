import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonDatetime,
  IonIcon,
  IonItem,
  IonPopover,
  IonText,
} from "@ionic/react";
import { body, fingerPrint, trash } from "ionicons/icons";
import React, { useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { enUS } from "date-fns/locale";
export type Props = {
  mt: boolean;
  renderList: () => void;
};
import { IdoctorData } from "../../pages/doctors/approved-doctors/ApprovedDoctorList";
import DeletePopup from "../delete-popup/DeletePopup";
import AlertError from "../alerts/AlertError";
import Toast from "../Custom Toast/Toast";
const ApprovedDoctorsCard: React.FC<Props & IdoctorData> = ({
  mt,
  Id,
  Name,
  MobileNumber,
  Password,
  IsApproved,
  IsEnabled,
  Email,
  DoctorType,
  PMDC,
  ValidUpto,
  renderList,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const handleDateChange = (event: CustomEvent) => {
    setSelectedDate(event.detail.value);
    closePopover();
    UpdateExpiryDateOfDoctor(event.detail.value);
  };
  const isExpired = isBefore(new Date(ValidUpto), new Date());
  const isValid = isAfter(new Date(ValidUpto), new Date());

  const UpdateExpiryDateOfDoctor = (updatedDate: string) => {
    const dataTobeSent = {
      id: Id,
      // name: "string",
      // mobileNumber: "string",
      // password: "string",
      // IsApproved: true,
      // isEnabled: true,
      // email: "string",
      // doctorType: "string",
      // pmdc: "string",
      validUpto: format(new Date(updatedDate), "dd-MMM-yyyy", {
        locale: enUS,
      }),
    };
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor/UpdateValidUpto/${Id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTobeSent),
    })
      .then((response) => {
        if (response.status === 204) {
          renderList();
        setSuccess(true)
        }
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <>
    <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Bulk date of admin schedule update successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while update bulk date of admin schedule. plz try again"
        color="danger"
      />
      {/* <AlertError
        isOpen={error}
        setOpen={setError}
        message="An Error occurred while updating date"
      /> */}
      <DeletePopup
        url={`${import.meta.env.VITE_API_URL}api/Doctor/${Id}`}
        title="Doctor"
        confirmAlertOpen={showPopup}
        setConfirmAlertOpen={setShowPopup}
        renderList={renderList}
      />
      <IonCard
        style={{ marginTop: `${mt ? 0 : null}`, marginInline: 0 }}
        className="md hydrated">
        <IonCardHeader style={{ padding: 0 }}>
          <IonItem>
            {Name}
            <IonItem lines="none" slot="end" style={{ padding: 0 }}>
              <IonText onClick={openPopover} style={{ cursor: "pointer" }}>
                Expiry: &nbsp; 
                <span style={{ color: isExpired ? "red" : isValid ? "green" : "" }}>
                  {format(new Date(selectedDate || ValidUpto), "MMM yyyy")}
                </span>
              </IonText>
              <IonPopover isOpen={showPopover} onDidDismiss={closePopover}>
                <IonDatetime
                  // displayFormat="MMM DD, YYYY"
                  presentation="month-year"
                  placeholder="Select Date"
                  value={selectedDate || undefined}
                  onIonChange={handleDateChange}
                ></IonDatetime>
              </IonPopover>
            </IonItem>
            <IonIcon
              onClick={() => setShowPopup(true)}
              style={{ cursor: "pointer" }}
              color="primary"
              icon={trash}
              size="small"
              slot="end"
              role="img"
              aria-label="trash"
            ></IonIcon>
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <p>Email: {Email}</p>
          <p>Number: {MobileNumber}</p>
          <p>PMDC No: {PMDC}</p>
          <IonButton color="tertiary" fill="outline" size="small">
            <IonIcon
              icon={fingerPrint}
              role="img"
              className="md hydrated"
              aria-label="finger print"
            ></IonIcon>{" "}
            Permissions{" "}
          </IonButton>
          <IonButton
            color="tertiary"
            fill="outline"
            size="small"
            disabled
            aria-disabled="true"
          >
            <IonIcon icon={body} role="img" aria-label="body"></IonIcon>{" "}
            Patients{" "}
          </IonButton>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ApprovedDoctorsCard;
