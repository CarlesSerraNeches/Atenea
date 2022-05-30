/*

SISTEMA DE TRADUCCIONES

*/



import i18next from 'i18next';

i18next
  .init({
    interpolation: {
      escapeValue: false,
    },
    lng: window.navigator.language[0] + window.navigator.language[1], // Establecemos el idioma del navegador 
    
    resources: {

      // Traducciones Ingles
      en: {
        translation: {
          user: 'User',
          pass: 'Password',
          maintenanceBook: 'Maintenance Book',
          noData: 'No data to show',
          loading: 'Loading',
          homeTittle : 'Home Page',
          maiBooTittle: 'Documents in MB',
          maiBooSubTitle: 'Select one to see the information',
          rubishTittle : 'Recovery Documents',
        },
      },

      // Traducciones Español
      es: {
        translation: {
          user: 'Usuario',
          pass: 'Contraseña',
          maintenanceBook: 'Libro de Mantenimiento',
          noData: 'No hay información a mostrar',
          loading: 'Cargando la información',
          homeTittle : 'Portada',
          maiBooTittle: 'Documentos incluidos en el LM',
          maiBooSubTitle: 'Selecciona uno para visualizar la información',
          rubishTittle : 'Papelera de Reciclaje',
        },
      },

      // Traducciones Catalan
      ca: {
        translation: {
          user: 'Usuari',
          pass: 'Contrassenya',
          maintenanceBook: 'Llibre de Manteniment',
          noData: 'No hi ha Informació a mostrar',
          loading: 'Carregant l\'informació',
          homeTittle : 'Portada',
          maiBooTittle: 'Documents inclosos en el LM',
          maiBooSubTitle: 'Selecciona un per visualitzar l\'informació',
          rubishTittle : 'Brosa de Recilatge',
        },
      },

      // Traducciones Frances
      fr: {
        translation: {
          user: 'User',
          pass: 'Mot de pass',
          maintenanceBook: 'Livre entretien',
          noData: 'Il n\'y a aucune information à afficher',
          loading: 'Chargement des informations',
          homeTittle : 'Page de garde',
          maiBooTittle: 'Documents inclus dans le LE',
          maiBooSubTitle: 'Selectionnez-en un pour afficher les informations',
          rubishTittle : 'Récupérer des fichiers',
        },
      },
    },
  })

export default i18next