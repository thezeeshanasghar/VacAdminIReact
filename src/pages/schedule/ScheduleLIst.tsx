import {
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import HeaderButtons from "../../components/HeaderButtons";
import Schedulecard from "../../components/Schedule-card/Schedulecard";
import { groupBy } from "lodash";

interface IDoseSchedule {
  Id: number;
  Name: string;
  MinAge: number;
  MinGap: number;
  VaccineId: number;
  
}

interface TGroupData {
  key: string;
  value: IDoseSchedule[];
}

const ScheduleList: React.FC = () => {
  const [data, setData] = useState<IDoseSchedule[]>([]);
  const [groupedData, setGroupData] = useState<TGroupData[]>([]);

  useEffect(() => {
    fetchVaccineData();
  }, [location]);

  const fetchVaccineData = async () => {
    // setShowLoading(true);/
    fetch(`https://myapi.fernflowers.com/doseschedule_date`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        // const updatedData = data.map(data=> {
        //     const dateString = data.DoseDate;
        //     const dateObject = new Date(dateString);
        //     return {
        //       ...data,
        //       date: dateObject
        //     };
        //   });

        //   // Log the updated data with Date objects
        //   console.log(updatedData);
        // for(var key in data) {

        //     const date= data.DoseDate.dateTimeString.split(/[T ]/);
        //    console.log(date)
        //     }
        //       // Example usage
        //       const apiData = [
        //         { id: 1, date: "2023-06-05T06:33:44.8808365-05:00", name: "John" },
        //         { id: 2, date: "2023-06-05T09:15:30.1234567-05:00", name: "Jane" },
        //         { id: 3, date: "2023-06-06T14:30:00.9876543-05:00", name: "Bob" },
        //         { id: 4, date: "2023-06-06T16:45:20.5678901-05:00", name: "Alice" },
        //       ];

        //   const groupedData = groupDataByDate(data);
        //   console.log(groupedData);

        console.log(data); // Display the retrieved data in the console

        // const groupedData = data.reduce((groups, item) => {
        //     // data.DoseDate.dateTimeString.split(/[T ]/);

        //     const { DoseDate, Name } = item;
        //     if (!groups[DoseDate]) {
        //       groups[DoseDate] = [];
        //     }
        //     groups[DoseDate].push(Name);
        //     return groups;
        //   }, {});
        //   setData(data)
        //   console.log(groupedData);
        // const dataArray = data.map(item =>{
        //     return {
        //       element1: item.DoseDate, // Replace 'property1' with the actual property you want to include as element 1
        //       element2: item.Id,
        //       element3: item.Name, // Replace 'property2' with the actual property you want to include as element 2
        //     };
        //   }); // Replace 'property' with the actual property you want to include in the array
        // console.log(dataArray);
        // function groupItems(array , property) {
        //     return array.reduce(function(groups, item) {
        //         var name = item[property]
        //         var group = groups[name] || (groups[name] = []);
        //         group.push(item);
        //         return groups;
        //     }, { });
        // }
        // var groups = groupItems(Array, 'date');
        // for(var key in groups) {
        //     var group = groups[key];
        //     console.log('"' + key + '"\t' + JSON.stringify(group, null, 4))
        // }
      });

    //   .then((data: IVaccineData[]) => {
    //     setData(data);
    //     setShowLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowLoading(false);
    //   })
    //   .finally(() => {
    //     setShowLoading(false);
    //   });
  };

  useEffect(() => {
   

    const groupedData = groupBy(data, (item) => {
      const date = new Date(item.DoseDate);
      return date.toISOString().split("T")[0];
    });

    console.log("groupedData", groupedData);

    const groupArray = [];
    for (const key in groupedData) {
      if (Object.prototype.hasOwnProperty.call(groupedData, key)) {
        const element = groupedData[key];
        groupArray.push({ key, value: element });
      }
    }

    console.log("groupArray", [...groupArray]);
    setGroupData(groupArray);

   
  }, [data]);

  return (
    <IonPage>
      <HeaderButtons pageName="" Showbutton={true} url="" />
      <IonContent className="ion-padding">
        
      {data &&
      groupedData.map((objectItem: any, index: number) => {
        const array = objectItem.value;
        return (
          <React.Fragment key={index}>
            <IonCard>
            <IonItem lines="none" className="ion-text-center ion-text-sm-start">
              <h2 >{objectItem.key}</h2></IonItem>
            {array.map((item: any, itemIndex: number) => (
            <IonItem key={itemIndex}>
               <Schedulecard
                Id={item.Id}
                Name={item.Name}
                MinAge={item.MinAge}
                MinGap={item.MinGap}
                VaccineId={item.VaccineId}
              />
            </IonItem>
            ))}
            </IonCard>
          </React.Fragment>
        );
      })}
      
      </IonContent>
    </IonPage>
  );
};

export default ScheduleList;
