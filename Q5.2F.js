import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App(){

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(()=>{

    socket.on("message",(msg)=>{
      setMessages(prev => [...prev,msg]);
    });

  },[]);

  const sendMessage = ()=>{

    socket.emit("message",message);

    setMessage("");
  };

  return(

    <div>

      <h1>Chat App</h1>

      <input
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      {
        messages.map((m,index)=>(
          <p key={index}>{m}</p>
        ))
      }

    </div>
  );
}

export default App;