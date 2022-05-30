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

import React, { useState} from 'react';

//Import Service
import get from '../../services/apiv2';
//Import common components
import ErrorToast from '../../components/ErrorToas/ErrorToast';
import Notification from '../../components/Notifications/Notifications';

import DeletedDocuemtns from './deletedDocuments/deteledDocuments';
// Traductor
import i18next from 'i18next';
//Import SQLite
import { WebSql } from '../../scripts/webSql'; // or the path of the file


const Rubish: React.FC = () => {
  const [recoveryDocuments, setRecoveryDocuments] = useState<any>();

  const webSql = new WebSql();
  let controlSQLite = true;

  useIonViewDidEnter(()=> {
    // Recuperamos la lista de reports del SQLite. En caso negativo usamos la API

    try{
      let response = webSql.selectValues('newDocument');
      console.log(response);
      if(response == null){
        console.log('RESPUESTA UNDEFINED');
        controlSQLite = true;      // Elemento de control
      }
    }catch ($e) {
      // Usando la API para recuperar el listado de STANDARD Reports
      get('report/recovery.php', 'GET')
      .then((res) => {
        console.log(res.data);
        setRecoveryDocuments(res.data);
      })
      .catch((err) => {
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
      get('report/recovery.php', 'GET')
      .then((res) => {
        console.log(res.data);
        setRecoveryDocuments(res.data);
      })
      .catch((err) => {
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
            <IonTitle size="large">{i18next.t('rubishTittle')}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {typeof recoveryDocuments !== 'undefined' ? (
          <>
            <DeletedDocuemtns delDocuments={recoveryDocuments} />
          </>
        ):(
          <IonLabel> {i18next.t('loading')} </IonLabel>
        )}

        <Notification />
      </IonContent>
    </IonPage>
  );
};

export default Rubish;
