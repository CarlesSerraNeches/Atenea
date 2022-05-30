const { Console } = require('console');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    //Habilitamos las cors  
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
// Public folder
app.use(express.static('public'));

// Funcion default. Saber si esta keep alive
app.get('/', function(req,res){
    res.status(200).send('Hola Mundo');
})


// Empezamos con los Socket
io.on('connection', function(socket) {
    console.log('Nueva Conexion');

    //Cundo se conecta mandamos confimración de conexion
    socket.emit('messages', 'Conexion Correcta');

    //Escuhcamos las respuestar
    socket.on('newAction', function(data) {
        console.log('>>> Hemos recibido la siguiente información');
        console.log(data);

        //Lanzamos un broadcast a todo el mundo
        socket.broadcast.emit('messages',data);
    })
})

//Servidor escuchando en el puerto 1998
server.listen(1998, function(){
    console.log('Servidor esta UP en http://localhost:1998');
});



