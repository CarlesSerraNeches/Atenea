import { 
  IonItem,
  IonAvatar,
  IonLabel,
  IonList,
  setupIonicReact,
  IonIcon
} from '@ionic/react';
import React from 'react';

import { trashOutline } from "ionicons/icons";
//Import Service
import get from './../../../services/apiv2';

//Import SQLite
import { WebSql } from './../../../scripts/webSql'; // or the path of the file

//Import notifications
import { sendFlag }  from '../../../components/Notifications/Notifications';
import ErrorToas from './../../../components/ErrorToas/ErrorToast';
import { StringifyOptions } from 'querystring';

// Forzamos vista IOS
setupIonicReact({
  mode: 'ios',
});


const DocumentList: React.FC<{documents : any[] }>= (documents) => {
  console.log(documents);
  const webSql = new WebSql();
  
  function deleteDocument(id : Number, title: string, docNumber: string, createdAt: string, active : Number ){
    console.log('eliminando... ');
    // Eliminamos el documento del MYSQL
    get('standardReports/delete.php?id=' + id, 'GET')
    .then((maiRes) => {
      //Verificar que devuelve infrmación valida
      if (maiRes.message[0].code !== '200'){
        console.log('Something goes wrong with the DDBB');
        return(<ErrorToas message='No se ha podido acceder a la base de datos'></ErrorToas>);
      }else{
        // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
        let payload = {
          "doc_id" : id,
          "sta_rep_title" : title,
          "sta_rep_document_number" : docNumber,
          "sta_rep_created_data" : createdAt,
          "active" : active
        }

        // Guardamos en el SQLite
        webSql.update('newDocument', payload);

        // Avisamos al webSocket
        sendFlag('newDocument', 'update', payload);
      }
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('Error');

    })

  }
  
  return (
    <IonList>
      { documents.documents.map((doc, idx) =>
        <IonItem routerLink={"/historial/201" }>
          <IonAvatar>
            <img src="./../../../assets/icon_maintenaceBook.png"/>
          </IonAvatar>
          <IonLabel>
            <h2>{doc.sta_rep_title}</h2>
          </IonLabel>
         <IonIcon onClick={() => deleteDocument(doc.sta_rep_id, doc.sta_rep_title, doc.sta_rep_document_number, doc.sta_rep_created_data, 0)} className="icon_modal_cancel ion-margin-bottom" size="large" icon={trashOutline}/>
        </IonItem>
      )}
    </IonList>
  );
};

export default DocumentList;
