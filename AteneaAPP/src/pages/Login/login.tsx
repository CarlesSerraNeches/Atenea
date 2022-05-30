import { 
  IonContent, 
  IonPage, 
  IonGrid, 
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonViewDidEnter
} from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import './login.css';


// API nest service
import get from './../../services/apiv2';

//Import Components
import ErrorToast from './../../components/ErrorToas/ErrorToast';

//Import Controller SQL
import { WebSql } from './../../scripts/webSql'; // or the path of the file

// Import translator
import i18next from './../../scripts/i18n/i18n';


const Login: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  let accessControl = false;
  const webSql = new WebSql();

  /**
   * En el Login realizamos un control de acceso.
   * En caso de ser afirmativo, sincronizamos el MYSQL con el SQLite
   */

  const doLogin = () => {
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', user);
    urlencoded.append('password', password);


    // Password : 1234a€F?IJ6VCwkHuw2
    //VERIFICAMOS SI EL USUARIO ES VALIDO
    get('user/read.php?user=' + user + '&password=' + password, 'GET')
    .then((session) => {
      if(session.data !== 'undefined'){

        // RECUPERAMOS LOS LM DE LA BASE DE DATOS
        get('maintenanceBook/list.php', 'GET')
        .then((maiRes) => {
          //Verificamos que la información es valida
          if (maiRes.message[0].code !== '200'){
            console.log('Something goes wrong with the DDBB');
            <ErrorToast message={'MENSAJE DE ERROR'}/>
          }else{
            try {
              console.log('Guardamos la info en local --> Se ha recuperado OKEY de la BBDD');
              console.log(maiRes.data);
              // Guardamos la información en el SQLite
              webSql.createTable('maibook',maiRes.data);
            }catch($e){
              console.log(' >>>SQL Failed');
            } 
          }
        })
        .catch((err) => {
          // No se ha podido realizar la conexion. Mostramos toast de error
          <ErrorToast message={'MENSAJE DE ERROR'}/>
          console.log(err);
        })
        
        // RECUPERAMOS LOS ST DE LA BASE DE DATOS -> Del documento 1
        get("report/listStandardReports.php?maintenanceBookId=1", 'GET')
        .then((res) => {
          console.log(res.data);
          try {
            console.log('Guardamos la info en local --> Se ha recuperado OKEY de la BBDD');
            console.log(res.data);
            // Guardamos la información en el SQLite
            webSql.createTable('staReport',res.data);
          }catch($e){
            console.log(' >>>SQL Failed_staReport: ' + $e);
          }
        })
        .catch((err) => {
          // No se ha podido realizar la conexion. Mostramos toast de error
          console.log('No se ha podido realizar la llamada a la API: ' + err);
          return(
            <ErrorToast message={'MENSAJE DE ERROR'}/>
          );
        })

        // RECUPERAMOS LOS CM DE LA BASE DE DATOS -> Del documento 1
        get('correctiveMaintenance/view.php?maiBooId=1', 'GET')
        .then((ress) => {
          console.log(ress.data);
          try {
            console.log('Guardamos la info en local --> Se ha recuperado OKEY de la BBDD');
            console.log(ress.data);
            // Guardamos la información en el SQLite
            webSql.createTable('corMaintenance',ress.data);
          }catch($e){
            console.log(' >>>SQL Failed_corMaintenance: ' + $e);
          }
        })
        .catch((err) => {
          // No se ha podido realizar la conexion. Mostramos toast de error
          console.log('No se ha podido realizar la llamada a la API: ' + err);
          return(
            <ErrorToast message={'MENSAJE DE ERROR'}/>
          );
        })
      }else{
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      }
      //Redireccionamos al Main Page
      history.push('/home');
    })
    .catch((error) => {
      <ErrorToast message={'MENSAJE DE ERROR'}/>
    })
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonIcon style={{ fontSize: "70px", color: "#0040ff" }} icon={personCircle} />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> {i18next.t('user')} </IonLabel>
            <IonInput onIonChange={(e) => setUser(e.detail.value!)} value={user} >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> {i18next.t('pass')} </IonLabel>
              <IonInput type='password' onIonChange={(e) => setPassword(e.detail.value!)} value={password}>
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={doLogin}>Login</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;