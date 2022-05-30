import {
  IonToast,
} from '@ionic/react';

import {useState} from 'react';

const ErrorToast: React.FC<{message : string}> = (message) => {
  /**
   *  
   * 
   */

  const [errorToast, setErroToast] = useState(true);
  const toastMessage = message;
  return(
      <IonToast
      isOpen={errorToast}
      onDidDismiss={() => setErroToast(false)}
      message = {'Error' + toastMessage}
      position="bottom" 
      buttons={[
        {
          text: 'Close',
          role: 'cancel',
        }
      ]}
    />
  );
}

export default ErrorToast;