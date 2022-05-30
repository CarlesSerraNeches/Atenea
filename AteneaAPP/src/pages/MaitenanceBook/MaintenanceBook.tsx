import { 
  IonContent, 
  IonHeader, 
  IonPage,
  IonToolbar, 
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonItem,
  IonTitle,
  useIonViewDidEnter,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonModal
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import './MaintenceBook.css';

//Import Service
import get from './../../services/apiv2';
//Import common components
import ErrorToast from './../../components/ErrorToas/ErrorToast';
import NewReportButton from './../../components/buttons/newReport/newReportBotton';
import StandardReports from './standardReports/standardReports';
import CorrectiveMaintenance from './corretiveMaintenance/correctiveMaintenance';
import Notification from '../../components/Notifications/Notifications';
// Traductor
import i18next from 'i18next';
//Import SQLite
import { WebSql } from './../../scripts/webSql'; // or the path of the file


const MaintenanceBook: React.FC = () => {
  const [standarsReports, setstandarsReports] = useState<any>();
  const [correctiveMaintenace, setcorrectiveMaintenace] = useState<any>();
  const { id } = useParams<{ id: string }>() //Get URL params 
  const { title } = useParams<{title: string}>()

  const webSql = new WebSql();
  let controlSQLite = true;

  useIonViewDidEnter(()=> {
    // Recuperamos la lista de reports del SQLite. En caso negativo usamos la API
    console.log('LOG: Maintenance Book ID');

    try{
      let response = webSql.selectValues('maibook');
      console.log(response);
      if(response == null){
        console.log('RESPUESTA UNDEFINED');
        controlSQLite = true;      // Elemento de control
      }
    }catch ($e) {
      // Usando la API para recuperar el listado de STANDARD Reports
      get("report/listStandardReports.php?maintenanceBookId=" + id, 'GET')
      .then((res) => {
        console.log(res.data);
        setstandarsReports(res.data);
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        console.log('No se ha podido realizar la llamada a la API: ' + err);
        return(
          <ErrorToast message={'MENSAJE DE ERROR'}/>
        );
      })

      // Usando la API para recuperar el listado de CORRECTIVE MAINTENACE
      get('correctiveMaintenance/view.php?maiBooId=' + id, 'GET')
      .then((ress) => {
        console.log(ress.data);
        setcorrectiveMaintenace(ress.data);
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        console.log('No se ha podido realizar la llamada a la API: ' + err);
        return(
          <ErrorToast message={'MENSAJE DE ERROR'}/>
        );
      })
      controlSQLite = false;  
    }

    console.log('Como esta el controlador? ' + controlSQLite);

    if(controlSQLite == true){
      // Elemento de control para recuperar los datos
      // Usando la API para recuperar el listado de STANDARD Reports
      get("report/listStandardReports.php?maintenanceBookId=" + id, 'GET')
      .then((res) => {
        console.log(res.data);
        setstandarsReports(res.data);
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        console.log('No se ha podido realizar la llamada a la API: ' + err);
        return(
          <ErrorToast message={'MENSAJE DE ERROR'}/>
        );
      })

      // Usando la API para recuperar el listado de CORRECTIVE MAINTENACE
      get('correctiveMaintenance/view.php?maiBooId=' + id, 'GET')
      .then((ress) => {
        console.log(ress.data);
        setcorrectiveMaintenace(ress.data);
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        console.log('No se ha podido realizar la llamada a la API: ' + err);
        return(
          <ErrorToast message={'MENSAJE DE ERROR'}/>
        );
      })
    }
  });

  return (
    <IonPage id="main">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>  
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>
            <h2>{i18next.t('maiBooTittle')}</h2>
            <p>{i18next.t('maiBooSubTitle')}</p>
          </IonLabel>
        </IonItem>

        {typeof standarsReports !== 'undefined' ? (
          <>
            <StandardReports standardReports={standarsReports} />
          </>
        ):(
          <IonLabel> {i18next.t('loading')} </IonLabel>
        )}

        <IonItem>
          <IonLabel>
            <h2>Manteniment Correctiu</h2>
            <p>Seleccioneu un per a visualitzar la informació</p>
          </IonLabel>
        </IonItem>

        {typeof correctiveMaintenace !== 'undefined' ? (
          <>
            <CorrectiveMaintenance standardReports={correctiveMaintenace} />
          </>
        ):( <></> )}
        
            {/* <IonButton id="trigger-button">Click to open modal</IonButton>
            <IonModal
              isOpen={true}
              swipeToClose={true}
            >
            <IonContent>Modal Content</IonContent>
          </IonModal> */}

        <Notification />
      </IonContent>
    </IonPage>
  );
};

export default MaintenanceBook;
