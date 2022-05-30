import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonMenuButton,
  setupIonicReact,
  IonLabel,
  IonItem,
  IonList,
  IonSearchbar,
  useIonViewDidEnter,
  IonToast,
  IonButton,
  IonAlert
} from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';



//Import the api Service
import get from '../../services/apiv2';

//Import Components
import Notification from '../../components/Notifications/Notifications';
import MaiBook from './maiBooks/maiBook';
import ErrorToast from '../../components/ErrorToas/ErrorToast';

//Import Controller SQL
import { WebSql } from './../../scripts/webSql'; // or the path of the file

// Traductor
import i18next from './../../scripts/i18n/i18n';


// Forzamos vista IOS
setupIonicReact({
  mode: 'ios',
});
const Home: React.FC = () => {
  const [showToastError, setShowToastError] = useState(false);
  const [maiBooks, setMaiBooks] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [searcher, setSearcher] = useState('');
  const webSql = new WebSql();

  let controlSQLite = true;

  useIonViewDidEnter(()=> {  
    /**
     * Cundo se carga el componente. Intentamos recupera los datos del SQLite y los mostramos.
     * Si no puede acceder al SQLite, realizamos una llamada a la API
     */

    console.log('LOG: Home page Load');

    /** Intenamos recuperar la información del SQLite */
    try{
      let response = webSql.selectValues('maibook');
      console.log(response);
      if(response == null){
        console.log('RESPUESTA UNDEFINED');
        controlSQLite = false;
      }
      
    }catch($err){
      // Recuperamos la infromación de la BBDD
      get('maintenanceBook/list.php', 'GET')
      .then((maiRes) => {
        //Verificar que devuelve infrmación valida
        if (maiRes.message[0].code !== '200'){
          console.log('Something goes wrong with the DDBB');
          setShowToastError(true);
        }else{
          // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
          setMaiBooks(maiRes.data);
        }
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        setShowToastError(true);
        console.log(err);
      })
    }

    if(controlSQLite == false){
      console.log('No ha funcionado el SQLite y usamos el metodo tradicional');
      // Recuperamos la infromación de la BBDD
      get('maintenanceBook/list.php', 'GET')
      .then((maiRes) => {
        //Verificar que devuelve infrmación valida
        if (maiRes.message[0].code !== '200'){
          console.log('Something goes wrong with the DDBB');
          setShowToastError(true);
        }else{
          // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
          setMaiBooks(maiRes.data);
        }
      })
      .catch((err) => {
        // No se ha podido realizar la conexion. Mostramos toast de error
        setShowToastError(true);
        console.log(err);
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
            <IonTitle size="large">{i18next.t('homeTittle')}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>{i18next.t('maintenanceBook')}</IonLabel>
        </IonItem>

        <IonSearchbar></IonSearchbar>

        {/* Llamamos al componente que renderiza la lista de LM */}
        {typeof maiBooks !== 'undefined' ? (
         <MaiBook maiBook={maiBooks} />
        ):(
          <IonLabel> {i18next.t('noData')} </IonLabel>
        )}
        
        <Notification/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
