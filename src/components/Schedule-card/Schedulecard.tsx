
import React from 'react';
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
import { format } from 'date-fns';
  interface IDoseSchedule{
    Id: number;
    Name: string;
    MinAge: number;
    MinGap: number;
    VaccineId: number;
    // DoseDate: string
}


const Schedulecard: React.FC<IDoseSchedule> = ({Name,}) => {

    return (
<>
    {Name}
    </>
    );
};

export default Schedulecard;