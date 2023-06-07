import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MyComponent.css';
import { IonContent, IonIcon } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
const Datepicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange = (date:any) => {
      setSelectedDate(date);
    };
  
    return (
      <IonContent>
        <div className="date-picker-container">
          <IonIcon icon={calendarOutline} className="calendar-icon" />
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="d MMM yyyy"
            placeholderText="Select a date"
            popperPlacement="bottom-end"
          />
        </div>
      </IonContent>
    );
  };
  export default Datepicker;