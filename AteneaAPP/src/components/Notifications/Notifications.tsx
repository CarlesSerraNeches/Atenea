import { IonLabel,IonButton } from '@ionic/react';

import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client"
import { WebSql } from './../../scripts/webSql'; // Controlador SQLite

//Importamos el componentes
import ErrorToast from '../ErrorToas/ErrorToast';
import { information } from 'ionicons/icons';

export function sendFlag(database : any, action: any, info:any){
  const webSql = new WebSql();
  const BASE_URL = "http://localhost:1998/"
  const socket = socketIOClient(BASE_URL);

  console.log('hola');
  let payload = {
    docId: info.docId,
    action: action,
    db: database,
    data: info
  }
  socket.emit("newAction", payload);
  console.log('>>> Mensage enviado (Broadcast)' + payload);
}

const Notification: React.FC = () => {
  const [response, setResponse] = useState("");
  const webSql = new WebSql();
  const BASE_URL = "http://localhost:1998/"
  const socket = socketIOClient(BASE_URL)

  useEffect(() => {
    // Realizamos la conexion al server y escuchamos qualuier otra novedad
    // Este es el controlado de la webSocket

    socket.on("messages", function(response) {
      console.log('<<< Mensage recibido: ');
      console.log(response);

      console.log(response.maiBooId)
      // En este punto Comporvamos la respuesta y la procesamos
      if(typeof response.maiBook !== 'undefined'){
        //Ha llegado informacion -> Procesamos y la guardamos al SQLite
        switch(response.db){
          case 'staReport':
            let payload = {
              docNumber : response.docNumber,
              ModuleName : response.ModuleName,
              Title : response.Title,
            }
            //Insertamos en MYSQL
            webSql.createTable('staReport', payload);
            break;
          default:
            console.log('Excepcion no controlada');
            return (<ErrorToast message='Excepción no controlada'></ErrorToast>)
          break;
        }
      }else{
        console.log('Nos ha llegado un mensage informativo');
      }
    } );
  }, [])

  // Funcion de test para enviar un mensage. La comentamos
  // function emitMessage(){
  //   console.log('hola');
  //   let payload = {
  //     maiBook: 'Carles Serra Atenea',
  //     docId: 'Esto es una prueba de conexion desde el cliente Atenea',
  //     action: 'Create',
  //     db: 'staReport'
  //   }
  //   socket.emit("newAction", payload);
  //   console.log('>>> Mensage enviado (Broadcast)' + payload);
  // }
  return (<></>);
};

export default Notification;
  