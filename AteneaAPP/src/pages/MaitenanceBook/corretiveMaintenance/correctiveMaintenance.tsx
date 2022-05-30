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


const CorrectiveMaintenance: React.FC<{standardReports : any[] }>= (standardReports) => {
  console.log('En el componente: standardReports');
  console.log(standardReports.standardReports);
  //onClick={() => openBook(book.id)}
  return (
    <IonList>
      { standardReports.standardReports.map((staRep, idx) =>
        <IonItem routerLink={"/maiBoo/" + staRep.mai_boo_it }>
          <IonAvatar>
            <img src="./../../../assets/icon_maintenaceBook.png"/>
          </IonAvatar>
          <IonLabel>
            <h2>{staRep.cor_ma_title}</h2>
            <h3>{staRep.cor_mai_type}</h3>
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default CorrectiveMaintenance;
