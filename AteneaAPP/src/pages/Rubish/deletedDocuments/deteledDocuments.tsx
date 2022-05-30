import { 
  IonItem,
  IonAvatar,
  IonLabel,
  IonList,
  setupIonicReact
} from '@ionic/react';
import React from 'react';


// Forzamos vista IOS
setupIonicReact({
  mode: 'ios',
});


const DeletedDocuemtns: React.FC<{delDocuments : any[] }>= (delDocuments) => {
  console.log('En el componente');
  console.log(delDocuments.delDocuments);

  return (
    <IonList>
      { delDocuments.delDocuments.map((delDoc, idx) =>
        <IonItem routerLink={"/documents/1/" + delDoc.DocNumber }>
          <IonAvatar>
            <img src="./../../../assets/icon_maintenaceBook.png"/>
          </IonAvatar>
          <IonLabel>
            <h2>{delDoc.SubModuleName}</h2>
            <h3>{delDoc.Title}</h3>
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default DeletedDocuemtns;
