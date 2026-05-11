import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (!message) return;

    const msgData = {
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  return (
    <div>
      <h2>Real-Time Chat</h2>

      <div>
        {chat.map((msg, i) => (
          <p key={i}>
            {msg.text} <small>{msg.time}</small>
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;