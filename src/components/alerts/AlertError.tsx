import { IonAlert } from "@ionic/react";
import React from "react";
interface AlertProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
const AlertError: React.FC<AlertProps> = ({ isOpen, setOpen, message }) => {
  return (
    <>
      <IonAlert
        isOpen={isOpen}
        header="Alert"
        color="danger"
        message={message}
        buttons={["OK"]}
        onDidDismiss={() => setOpen(false)}
      />
    </>
  );
};

export default AlertError;
