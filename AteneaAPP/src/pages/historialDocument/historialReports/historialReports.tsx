import {   
  IonRow,
  IonList,
  IonCol,
} from '@ionic/react';

const HistorialReports: React.FC<{historialList : any[] }>= (historialList) => {
  console.log('Historial List');
  console.log(historialList);

  return (
    <IonList>
      { historialList.historialList.map((historialItem, idx) =>
        <IonRow>
          <IonCol>{historialItem.rep_his_date}</IonCol>
          <IonCol>{historialItem.worker}</IonCol>
          <IonCol>{historialItem.rep_his_status}</IonCol>
          <IonCol>{historialItem.rep_his_text_one}</IonCol>
        </IonRow>

      )}
    </IonList>
  );
};

export default HistorialReports;
