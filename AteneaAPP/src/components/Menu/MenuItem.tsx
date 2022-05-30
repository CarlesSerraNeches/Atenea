import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonCol,
    IonChip,
    IonGrid,
    IonRow,
    IonItemDivider,
  } from '@ionic/react';
  
  import { useLocation } from 'react-router-dom';
  import { addCircleOutline, addCircleSharp, archiveOutline, archiveSharp, barChartOutline, barChartSharp, bookmarkOutline, buildOutline, buildSharp, businessOutline, businessSharp, calendarOutline, calendarSharp, chatboxEllipsesOutline, chatboxEllipsesSharp, colorWandOutline, colorWandSharp, heartOutline, heartSharp, helpCircle, helpCircleOutline, keyOutline, keySharp, mailOutline, mailSharp, newspaperOutline, newspaperSharp, paperPlaneOutline, paperPlaneSharp, planetOutline, planetSharp, pulseOutline, pulseSharp, scanCircle, sparklesOutline, sparklesSharp, swapVerticalOutline, swapVerticalSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
  import './MenuItem.css';
  
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }
  
  const appPages: AppPage[] = [
    {
      title: 'Home',
      url: '/',
      iosIcon: barChartOutline,
      mdIcon: barChartSharp
    },
  ];

  interface QuickAction {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }

  const appQuickActions: QuickAction[] = [
    {
      title: 'Nuevo Documento',
      url: '/newDocument',
      iosIcon: addCircleOutline,
      mdIcon: addCircleSharp
    },
    {
      title: 'Papelera',
      url: '/Inbox',
      iosIcon: sparklesOutline,
      mdIcon: sparklesSharp
    },
  ];
  
  const Menu: React.FC = () => {
    const location = useLocation();
  
    return (
      <IonMenu contentId="main" type="push">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>¡Hola Carles!</IonListHeader>
            <IonNote>Universitat d'Andorra</IonNote>

            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
  
            <IonListHeader>Accesos rápidos</IonListHeader>
            {appQuickActions.map((QuickAction, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === QuickAction.url ? 'selected' : ''} routerLink={QuickAction.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={QuickAction.iosIcon} md={QuickAction.mdIcon} />
                    <IonLabel>{QuickAction.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonChip color="primary">
                    <IonIcon icon={helpCircleOutline} />
                    <IonLabel>Notificaciones</IonLabel>
                  </IonChip>
                
                </IonCol>
              </IonRow>
            </IonGrid>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;
  