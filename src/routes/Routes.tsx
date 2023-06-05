import { IonPage, IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import VaccineCardList from "../pages/vaccines/VaccineCardList";
import Dashboard from "../pages/dashboard/Dashboard";
import EditVaccine from "../pages/vaccines/EditVaccine";
import VaccineDoseCardList from "../pages/vaccines/doses/VaccineDoseCardList";
import AddVaccine from "../pages/vaccines/AddVaccine";
import VaccineBrandCardList from "../pages/vaccines/brands/VaccineBrandCardList";
import ApprovedDoctorList from "../pages/doctors/approved-doctors/ApprovedDoctorList";
import UnApprovedDoctorList from "../pages/doctors/unapproved-doctors/UnApprovedDoctorList";
import Patient from "../pages/patient/Patient";
import AddDose from "../pages/vaccines/doses/AddDose";
import AddBrands from "../pages/vaccines/brands/AddBrands";
import EditDose from "../pages/vaccines/doses/EditDose";
import EditBrand from "../pages/vaccines/brands/EditBrands";
import Test from "../pages/test/Test";

const Routes: React.FC = () => {
  return (
    <>
      <IonRouterOutlet id="main-content">
        <Route exact path="/members/dashboard" component={Dashboard} />
        <Route exact path="/members/vaccine" component={VaccineCardList} />
        <Route exact path="/members/patient" component={Patient} />
        <Route exact path="/members/vaccine/add" component={AddVaccine} />
        <Route
          exact
          path="/members/vaccine/edit/:vaccineId"
          component={EditVaccine}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/doses"
          component={VaccineDoseCardList}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/doses/add"
          component={AddDose}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/doses/edit/:doseId"
          component={EditDose}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/brands"
          component={VaccineBrandCardList}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/brands/add"
          component={AddBrands}
        />
        <Route
          exact
          path="/members/vaccine/:vaccineId/brands/edit/:brandId"
          component={EditBrand}
        />
        <Route
          exact
          path="/members/doctor/approved"
          component={ApprovedDoctorList}
        />
        <Route
          exact
          path="/members/doctor/unapproved"
          component={UnApprovedDoctorList}
        />
        <Route exact path={"/members/test"} component={Test} />
        <Route exact path="/members">
          <Redirect to="/members/dashboard" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};

export default Routes;
