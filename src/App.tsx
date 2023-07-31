import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/login/Login";
import SideMenu from "./pages/sidemenu/SideMenu";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
// import BrandCard from './components/brand-card/BrandCard'
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
// import React from "react";
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Login} />
          <Route path="/members" component={SideMenu} />
          {/* <Route path="*" component={NotFound} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

// const NotFound: React.FC = () => <h1>Not Found</h1>;

export default App;
