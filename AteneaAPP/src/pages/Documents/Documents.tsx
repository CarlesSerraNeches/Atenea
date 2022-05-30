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

//Import Service
import get from '../../services/apiv2';

//Import components
import ErrorToast from '../../components/ErrorToas/ErrorToast';
import DocumentList from './DocumentsList/documentList';

const   Documents: React.FC = () => {
  const [documents, setDocuments] = useState<any>();

  const { id } = useParams<{ id: string }>() //Get URL params 
  const { reportId } = useParams<{ reportId: string }>() //Get URL params 

  useIonViewDidEnter(()=> {
    console.log('LOG: Documents List PAGE');

    get("standardReports/view.php?maiBooId=" + id + "&staRepDocNum=" + reportId, 'GET')
    .then((res) => {
      console.log('DOCUMENTS : ---');
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
            <IonTitle size="large">{reportId}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>
            <h2> Llistat de docuemnts {reportId} </h2>
            <p>Seleccioneu un per a visualitzar la informació</p>
          </IonLabel>
        </IonItem>

        {typeof documents !== 'undefined' ? (
          <>
            <DocumentList documents={documents} />
          </>
        ):( 
          <IonLabel> Cargando ...</IonLabel>
         )}

      </IonContent>
    </IonPage>
  );
};

export default Documents;
