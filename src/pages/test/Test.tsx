import React, { useState } from "react";
import { IonAlert, } from "@ionic/react";
import axios from "axios";
interface Iprops {
  url: string;
  title: string;
  handleDelete: () => void;
}
const Test: React.FC<Iprops> = ({ url, title, handleDelete }) => {
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);
  const [resultAlertOpen, setResultAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDelete = () => {
    //delete action (API call)
    deleteData()
      .then((response) => {
        if (response.status === 204) {
          // console.log("response object : ", response);
          setSuccessMessage(`${title} deleted successfully`); 
          setResultAlertOpen(true);
        }
      })
      .catch((error) => {
        console.log("error.response : ", error);
        if (error.response) {
          setErrorMessage(error.response.data);
          setResultAlertOpen(true);
        } else {
          console.error("Error deleting vaccine:", error);
          setErrorMessage("An error has occurred, please try again");
          setResultAlertOpen(true);
        }
      });
  };

  const handleCancelDelete = () => {
    setConfirmAlertOpen(false);
  };

  const handleAlertDismiss = () => {
    setResultAlertOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  //delete api call
  const deleteData = () => {
    return axios.delete(url);
  };

  return (
    <>
      <IonAlert
        isOpen={confirmAlertOpen}
        onDidDismiss={handleCancelDelete}
        header="Confirm Delete"
        message="Are you sure you want to delete?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCancelDelete,
          },
          {
            text: "Confirm",
            handler: handleConfirmDelete,
          },
        ]}
      />

      {/* Result Alert */}
      <IonAlert
        isOpen={resultAlertOpen}
        onDidDismiss={handleAlertDismiss}
        header={
          successMessage
            ? "Delete Successful"
            : errorMessage
            ? "Delete Error"
            : ""
        }
        message={successMessage || errorMessage}
        buttons={[
          {
            text: "OK",
            handler: handleAlertDismiss,
          },
        ]}
      />
    </>
  );
};

export default Test;
