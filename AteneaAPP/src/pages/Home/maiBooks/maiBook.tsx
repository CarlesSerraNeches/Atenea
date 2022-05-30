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


const MaiBook: React.FC<{maiBook : any[] }>= (maiBook) => {
  console.log('En el componente');
  console.log(maiBook.maiBook);
  maiBook.maiBook.forEach((mai) => {
    console.log(mai.mai_boo_id);
  });  
  //onClick={() => openBook(book.id)}
  return (
    <IonList>
      { maiBook.maiBook.map((book, idx) =>
        <IonItem routerLink={"/maiBoo/" + book.mai_boo_it + "/" + book.mai_boo_id }>
          <IonAvatar>
            <img src="./../../../assets/icon_maintenaceBook.png"/>
          </IonAvatar>
          <IonLabel>
            <h2>{book.mai_boo_title}</h2>
            <h3>{book.mai_boo_id}</h3>
            <p>{book.mai_boo_it}</p>
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default MaiBook;
