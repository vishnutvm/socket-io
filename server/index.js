const express = require('express');
const app = express();
const cors = require('cors');

// setting cors
app.use(cors());

// as we using express we not need to use http
//  but in the case of the soket io we need ot install this as the documentation given in the
// official documentation of the socket io so . we install the http and config server throught it

const http = require('http');

// importing the server class from the socket io
const { Server } = require('socket.io');

// server setup
const server = http.createServer(app);

// creatin the conneciton with the socket io
// by creating a object form Server class
// giving arguments like server which we created
// cors config (impg give the origin as * or the url of the  client side , all otherrs according to needs)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

//the work flow of the socket io is like we emit a event with data from front end and the event will listen in back end
// on that listen the back end will create another emit and that emit can be called in front end  so finally the data will be
// get in  front end

// for listen to the events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // room event
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  // listening to the event
  // the name must be same other wise it will not work
  socket.on('send_message', (data) => {
    console.log(data);
    // from here we can make a emit to send the data to all of those conncted to the same server
    // here we broadcating the emit to all of those conntected to this
    // now who ever need the message can listen to this "recive_message"
    // socket.broadcast.emit('recive_message', data);

    //* sending data to the particular persons who listening to the socket
    socket.to(data.room).emit('recive_message', data); 
  });
});

//server listen

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON 3001');
});
