/**
 * 
 * CONNECTOR PARA LA API
 * 
 * 
 */


const basePath = 'http://localhost:8080/ateneaApi/api/';
const _headers = new Headers();

_headers.append('Content-Type', 'application/json');

function get(endPoint : string, urlOptions: string){
  var requestOptions = {
    method: urlOptions,
  };

  return fetch(basePath + endPoint, requestOptions)
  .then((response) => {
    if (response.status !== 200) {
      console.log(' ⚠️ API CONNECTION ERROR ⚠️: Respuesta != 200: ' + response.status);
      return;
    }
    return response.json();
  }).catch((error) => {
    console.log('‼️ No se ha podido realizar la petición: ' + error);
    return;
  });
}

export function put(endPoint : string, body: any, urlOptions: string){
  var requestOptions = {
    method: urlOptions,
    headers: _headers,
    body: body,
  };

  return fetch(basePath + endPoint, requestOptions)
  .then((response) => {
    return response.json();
  }).catch((error) => {
    console.log('‼️ No se ha podido realizar la petición: ' + error);
    return;
  });
}

export default get;

