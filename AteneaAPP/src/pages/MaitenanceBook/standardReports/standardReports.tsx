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


const StandardReports: React.FC<{standardReports : any[] }>= (standardReports) => {
  console.log('En el componente');
  console.log(standardReports.standardReports);

  return (
    <IonList>
      { standardReports.standardReports.map((staRep, idx) =>
        <IonItem routerLink={"/documents/1/" + staRep.DocNumber }>
          <IonAvatar>
            <img src="./../../../assets/icon_maintenaceBook.png"/>
          </IonAvatar>
          <IonLabel>
            <h2>{staRep.ModuleName}</h2>
            <h3>{staRep.DocNumber}</h3>
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default StandardReports;
