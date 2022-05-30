import { 
  IonContent, 
  IonHeader, 
  IonPage,
  IonToolbar, 
  IonButtons,
  IonItem,
  IonTitle,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonMenuButton,
  useIonViewDidEnter,
  IonTextarea,
  IonFab
} from '@ionic/react';
//import { thermometerOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client"

// Service
import get, {put} from '../../services/apiv2';

// Import Components
import ItemList from '../../components/itemsList/itemList';
import ErrorToast from '../../components/ErrorToas/ErrorToast';
import Camera from '../../components/camera/camera';
import Notification from '../../components/Notifications/Notifications';

const NewDocument: React.FC = () => {
  const [ItemsList, setItemsList] = useState<any>();

  const [state, setState] = useState<string>('');
  const [text, setText] = useState<string>('');

  function saveDB() {
    console.log(text);
    console.log(state);

    var urlencoded = new URLSearchParams();
    urlencoded.append('pcode', text);
    urlencoded.append('token', state);

    put("/historialStandardReport/create.php", urlencoded,"GET")
    .then((response) => {
      console.log(response)
      // Como hemos creado un documento avisamos al webSocket
    })
    .catch(($err) => {
      console.log($err);
    });
  }
  useIonViewDidEnter(()=> {

    get("elements/view.php?subType=Element&subModuleId=201", "GET")
    .then((res) => {
      console.log('SUB MODULES !!!!');
      console.log(res.data);
      setItemsList(res.data);
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('No se ha podido realizar la llamada a la API: ' + err);
      return(
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      );
    })
  });

  return(
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
            <IonTitle size="large">Nova Inspecció</IonTitle>
          </IonToolbar>
        </IonHeader>

        { /* Activamos el componente del webHook */}
        <Notification></Notification>

        <IonItem>
          <IonLabel>
            <h1> Llistat d'elemts a verificar</h1>
          </IonLabel>
        </IonItem>

        {typeof ItemsList !== 'undefined' ? (
          <>
            <ItemList itemsList={ItemsList} />
          </>
        ):( <></> )}

        
        <IonItem>
          <IonLabel>
            <h1>Estat</h1>
            <p>Estat general del elemnt</p>
          </IonLabel>
          <IonSelect interface="popover" onIonChange={e => setState(e.detail.value)}>
            <IonSelectOption value={"C"}>C - Correcte</IonSelectOption>
            <IonSelectOption value={"NC"}>NC - No Correcte</IonSelectOption>
            <IonSelectOption value={"NA"}>NA - No Aplica</IonSelectOption>
            <IonSelectOption value={"NR"}>NR - No Revisat</IonSelectOption>
          </IonSelect>
        </IonItem>
        <br/>
        <IonItem>
          <IonLabel>
            <h1> Observacions</h1>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>Introduexi les observacions, si es necesaris</p>
          </IonLabel>
          <IonTextarea onIonChange={e => setText(e.detail.value!)}>

          </IonTextarea>
        </IonItem>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          
        </IonFab>
        <Camera></Camera>

        <IonButton expand="block" type="submit" color="primary" onClick={() => saveDB()} >Guardar</IonButton>

      </IonContent>
    </IonPage>
  );
  
};

export default NewDocument;
