import './App.css';
import React,{useEffect, useState} from 'react';
import io from "socket.io-client";
import {Get, Post, Put} from './requests';
import Textbox from './textbox';
const ENDPOINT = "http://127.0.0.1:5000";


let socket;
function App() {

  const [input, setInput] = useState('');
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState({msgs:[], room:''});
  const [room, setRoom] = useState('');
  const [Ids, setIds] = useState([]);
  const [Id, setId] = useState('');

  const start = ()=>{
    Get().then(results => {
      setIds(results);
    });
  }
  
  useEffect(() => {
    setUser(prompt('Please write your name: '));
    setRoom(prompt('Please enter Room: '));
    socket = io(ENDPOINT);
  }, []);
  
  useEffect(() => {
   start();
  },[user]);

  useEffect(() => {
    console.log('IDS: ',Ids);
    socket.emit('Join_Room', room);
    var found = false;
    if(room !== ''){
      for(let i = 0; i<Ids.length; i++){
        if(Ids[i].room === room){
           setMessages({msgs: Ids[i].chat, room: room});
           console.log('found room ',Ids[i].room);
           setId(Ids[i]._id);
           console.log('id: ',Id);
           found = true;
        }
      }     

      console.log('Found: ',found)
       
      if(!found){
       Post({room:room, chat:[]}).then((result)=>setId(result));
      }
      console.log('Id: ',Id);
    }
  }, [Ids]);

  const Send = async () => {
    let msg = { 
      room: room,
      msg: {
        input: input, 
        user: user
      }  
    }
    
    Put(Id,{input:input, user:user});

    await socket.emit('message',msg);
    setMessages({msgs: [...messages.msgs, msg.msg], room:room});
    setInput('');
  }
   
  useEffect(() => {
    socket.on("send", (data) => {
      setMessages({msgs: [...messages.msgs, data], room:room});
    });
  },);

  return (
    <div className="App">
      <div>
      <Textbox msgs={messages.msgs} currentUser={user} />
      </div>
      <div className="form">
       <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}>
       </input>
       <button type='submit' onClick={Send}>Send</button>
      </div>
      <div>
        {/*messages.msgs.map((val,key)=>{
          return(
          <p>{val.user}:{val.input}</p>
          )
        })*/}
      </div>

    </div>
  );
}

export default App;
