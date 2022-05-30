import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact, 
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { 
  list, 
  chatbubbles,
  pulse 
} from 'ionicons/icons';

import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Import the pages and components
import Home from './pages/Home/Home';
import Menu from './components/Menu/MenuItem';
import MaintenanceBook from './pages/MaitenanceBook/MaintenanceBook';
import Default from './pages/Templates/default';
import NewReport from './pages/NewReport/NewReport'
import Login from './pages/Login/login';
import Documents from './pages/Documents/Documents';
import Historial from './pages/historialDocument/Historial';
import NewDocument from './pages/NewDocument/NewDocument';
import Rubish from './pages/Rubish/Rubish';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu />
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/maiBoo/:title/:id">
            <MaintenanceBook />
          </Route>
          <Route exact path="/documents/:id/:reportId">
            <Documents />
          </Route>
          <Route exact path="/historial/:id">
            <Historial />
          </Route>
          <Route exact path="/newReport">
            <NewReport />
          </Route>
          <Route exact path="/newDocument">
            <NewDocument />
          </Route>
          <Route exact path="/temp">
            <Default />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/rubish">
            <Rubish />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Dashboard" href="/">
            <IonIcon icon={list} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Inbox" href="/maiBoo">
            <IonIcon icon={chatbubbles} />
            <IonLabel>Calendari</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Activity" href="/">
            <IonIcon icon={pulse} />
            <IonLabel>Actividad</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
