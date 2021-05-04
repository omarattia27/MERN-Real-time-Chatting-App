import express from 'express';
import { Server } from "socket.io";;
import cors from 'cors';
import api from './api.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json({  extended: true }))
app.use(bodyParser.urlencoded({  extended: true }))
app.use(cors());
app.use(express.json());
app.use('/api',api);

const server  =  app.listen(5000, ()=>{
    console.log('Listining on port 5000');
  }
);

const CONNECTION_URL = "mongodb+srv://Omarmohamed2013:Omarmohamed2013@cluster0.0ffel.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Server Running on Port: http://localhost:5000`))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log("A user connected");

    socket.on("Join_Room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
      });

    socket.on("message", (data) => {
       console.log(data);
       socket.to(data.room).emit('send', data.msg);
    });

    socket.on('disconnect', ()=>{
        console.log("User desconnedted");
    });

});