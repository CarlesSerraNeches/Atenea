var socket = io.connect('http://localhost:1998',  {'forceNew': true} );



// ASocket escuchando al 'Message'
socket.on('messages', function(data) {
    //Cuando recibamos un flag actulizamos la BBDD
    //render(data);
    console.log('<<< Hemos recibido un mensage nuevo');
    console.log(data);


    //Hacemos de cliente test
    socket.on('newAction', function(data){
        console.log('<<<Recibiendo información de otro usario', data);

        //Si fuera un cliente real procesaria la información;
    })
    

})

function addMessage(e) {
    var payload = {
        maiBooId: document.getElementById('LM_ID').value,
        docId: document.getElementById('DC_ID').value,
        action: document.getElementById('ACTION').value,
    }
    socket.emit("newAction", payload);
    console.log(' >>> Mensage enviado (Broadcast)' + payload);
    return false;
}