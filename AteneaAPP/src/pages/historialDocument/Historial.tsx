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
  IonModal,
  IonList,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState} from 'react';
import { useParams } from 'react-router-dom';

//Import Service
import get from '../../services/apiv2';

//Import components
import ErrorToast from '../../components/ErrorToas/ErrorToast';
import NewReportButton from '../../components/buttons/newReport/newReportBotton';
import ItemList from './../../components/itemsList/itemList';
import HistorialReports from './historialReports/historialReports';

const Historial: React.FC = () => {
  const [documents, setDocuments] = useState<any>();
  const [ItemsList, setItemsList] = useState<any>();

  const { id } = useParams<{ id: string }>() //Get URL params 
   

  useIonViewDidEnter(()=> {
    console.log('LOG: Documents List PAGE');

    get("elements/view.php?subType=Element&subModuleId=201", "GET")
    .then((res) => {
      console.log('SUB MODULES !!!!');
      console.log(res.data);
      setItemsList(res.data);
      //Recuperamos el historial
      get("historialStandardReport/view.php?staRepId=1", 'GET')
      .then((res) => {
        console.log('Historial Documents');
        console.log(res.data);
        setDocuments(res.data);
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        console.log('No se ha podido realizar la llamada a la API: ' + err);
        return(
          <ErrorToast message={'MENSAJE DE ERROR'}/>
        );
      })
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('No se ha podido realizar la llamada a la API: ' + err);
      return(
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      );
    })

    
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
            <IonTitle size="large">Historial de la Inpspecció</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>
            <h2> Llistat d'elements a verificar  </h2>
          </IonLabel>
        </IonItem>


        {typeof ItemsList !== 'undefined' ? (
          <>
            <ItemList itemsList={ItemsList} />
          </>
        ):( <></> )}


        <br/>

        <IonItem>
          <IonLabel>
            <h1> Historial d'inspeccions </h1>
          </IonLabel>
        </IonItem>

        <IonGrid>
          <IonRow>
            <IonCol>Data</IonCol>
            <IonCol>Tècnic</IonCol>
            <IonCol>Estat</IonCol>
            <IonCol>Observacions</IonCol>
            <IonCol></IonCol>
          </IonRow>

          {typeof documents !== 'undefined' ? (
          <>
            <HistorialReports historialList={documents} />
          </>
        ):( <></> )}
        </IonGrid>
    
        <NewReportButton />
      </IonContent>
    </IonPage>
  );
};

export default Historial;
