import {
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';

const NewReportButton: React.FC = () => {

  /**
   *  Programamos la vista del boton y su acción
   * 
  */
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton routerLink={"/newDocument" }>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
};
  
export default NewReportButton;
  