import {   
  IonItem,
  IonList,
} from '@ionic/react';

const ItemList: React.FC<{itemsList : any[] }>= (itemsList) => {
  /** Component to show a list of items */
  console.log('Item list');
  console.log(itemsList);
  return (
    <IonList>
      { itemsList.itemsList.map((item, idx) =>
        <IonItem>
          <p> {item.mai_boo_sup_description} </p>
        </IonItem>
      )}
    </IonList>
  );
};

export default ItemList;
