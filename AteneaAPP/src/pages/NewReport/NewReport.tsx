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
  useIonViewDidEnter
} from '@ionic/react';
//import { thermometerOutline } from 'ionicons/icons';
import React, { useState } from 'react';

// Service
import get from './../../services/apiv2';

// Import Components
import ErrorToast from './../../components/ErrorToas/ErrorToast';
import { swapVerticalSharp } from 'ionicons/icons';

const NewReport: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [subModules, setSubModules] = useState<any[]>([]);
  const [reportType, setReportType] = useState<any[]>([]);

  const [moduleSelecter, setmoduleSelecter] = useState<string>();
  const [subModuleSelecter, setsubModuleSelecter] = useState<string>();
  const [reportTypeSelector, setreportTypeSelector] = useState<string>();

  useIonViewDidEnter(()=> {
    //Modules
    get('maintenanceBookSupport/read.php?supType=Module', 'GET')
    .then((res) => {
      // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
      console.log(res.data);
      setModules(res.data);
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('No se ha podido realizar la llamada a la API: ' + err);
      return(
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      );
    })

    // SubModules
    get('maintenanceBookSupport/read.php?supType=Sub-Module', 'GET')
    .then((res) => {
      // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
      console.log(res.data);
      setSubModules(res.data);
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('No se ha podido realizar la llamada a la API: ' + err);
      return(
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      );
    })

    //Report Type
    get('maintenanceBookSupport/read.php?supType=Report', 'GET')
    .then((res) => {
      // Ha funcionado todo correctamente -> Guardamos la información en el SQLite
      console.log(res.data);
      setReportType(res.data);
    })
    .catch((err) => {
      // No se ha podido realizar la conexion. Mostramos toast de error
      console.log('No se ha podido realizar la llamada a la API: ' + err);
      return(
        <ErrorToast message={'MENSAJE DE ERROR'}/>
      );
    })
  });

  function openCreateReport(){
    console.log('>> Vamos a guardar el Documento');
    console.log(moduleSelecter);

    switch(reportTypeSelector){
     case 'Informe estàndard':{
       
     }
    }
    // this.newReport.rep_maintenance_book_id = this.maiBooId;
    // switch(this.reportType){
    //   case 'Informe estàndard': {
    //     this.maiBooService.createStandarReport(this.newReport).subscribe(
    //       res => { 
    //         localStorage.setItem('maiBooId', this.maiBooId);
    //         this.getStandardReportId();
    //         this.NavController.navigateForward('new-standard-report/' + this.newReport.rep_title + '/' + this.newReport.rep_submodule_id + '/2/' + this.newReport.rep_document_number )},
    //       err => {console.log(err); } 
    //     );
    //     break;
    //   }
    //   case 'Manteniment Correctiu': {
    //     this.maiBooService.createCorrectiveMaintenace(this.newReport).subscribe(
    //       res => {
    //         this.getCorrectiveMaintenanceId();
    //         this.NavController.navigateForward('/new-corrective-maintenance/' + this.newReport.rep_module_id + '/' + this.newReport.rep_submodule_id + '/' + this.corId);
    //       },
    //       err => {console.log('err')}
    //     )
    //     break;
    //   }
    // }
  }
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
            <IonTitle size="large">Nou Document</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>
            <h2>Crear un nou Document</h2>
            <p>Empleneu els següents formularis per crear un nou document.</p>
            <p> Recordeu que disposeu de tres documents diferents:</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color="medium" position="floating"> Grup </IonLabel>
          <IonSelect interface="popover" onIonChange={e => setmoduleSelecter(e.detail.value)}>
            {modules.map((module) =>
              <IonSelectOption>{module.mai_boo_sup_value} - {module.mai_boo_sup_description}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel color="medium" position="floating"> Sub grup </IonLabel>
          <IonSelect interface="popover" onIonChange={e => setsubModuleSelecter(e.detail.value)}>
            {subModules.map((submodule) =>
              <IonSelectOption>{submodule.mai_boo_sup_value} - {submodule.mai_boo_sup_description}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel color="medium" position="floating"> Tipus d'informe </IonLabel>
          <IonSelect interface="popover"  onIonChange={e => setreportTypeSelector(e.detail.value)}>
            {reportType.map((report) =>
              <IonSelectOption>{report.mai_boo_sup_value} - {report.mai_boo_sup_description}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel color="medium">Periodicitat: </IonLabel>
          <IonInput> </IonInput>
        </IonItem>

        <IonItem>
          <IonLabel  color="medium">Document Nº: </IonLabel>
          <IonInput> </IonInput>
        </IonItem>

        <IonItem>
          <IonLabel  color="medium">Títol: </IonLabel>
          <IonInput> </IonInput>
        </IonItem>

        <IonButton onClick={() => openCreateReport()} expand="block" type="submit" color="secondary">Següent</IonButton>

      {/* 
    

      <br>
      <div *ngIf="reportType === 'Informe estàndard'">
        <ion-item>
          <ion-label color="medium" > Periodicitat:  </ion-label>
          <ion-input [(ngModel)]="newReport.rep_periodicity"> </ion-input>
        </ion-item>
      </div>
      <ion-item>
        <ion-label color="medium" > Document Nº:  </ion-label>
        <ion-input [(ngModel)]="newReport.rep_document_number"> </ion-input>
      </ion-item>

      <ion-item>
        <ion-label color="medium"> Títol:  </ion-label>
        <ion-input [(ngModel)]="newReport.rep_title"> </ion-input>
      </ion-item>
      <br>
      <ion-button expand="block" type="submit" color="secondary" (click)="openCreateReport()" >Següent</ion-button> */}
    </IonContent>
  </IonPage>
  );
};

export default NewReport;
