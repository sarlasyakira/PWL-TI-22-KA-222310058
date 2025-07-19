import React, { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "cong ke botani yuk", time: "12:58", side: "left", sentiment: "positive" },
    { text: "sialan! kapan?", time: "12:58", side: "right", sentiment: "negative" },
    { text: "kerja kan hari ini? beres kerja weh langsung ketemuan disana", time: "12:58", side: "right", sentiment: "positive" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      side: "right",
      sentiment: "neutral", // bisa kamu ganti logikanya nanti
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <input type="text" placeholder="Search or start a new chat" />
        <h3>Favorites 🥰</h3>
        <div className="favorites">
          <div className="favorite-item">MANDA TELMI</div>
          <div className="favorite-item">Dhea NikMir</div>
        </div>
        <h3>Your Contact</h3>
        <div className="contacts">
          <div className="contact-item">Rio IBIK</div>
          <div className="contact-item">EX</div>
          <div className="contact-item">CRUSH</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat">
        <div className="chat-header">
          <div>
            <div className="contact-name">MANDA TELMI</div>
            <div className="status">
              <span className="status-dot"></span>
              <span className="status-text">online</span>
            </div>
          </div>
        </div>

        <div className="chat-body">
          {messages.map((msg, index) => (
            <div className={`message ${msg.side}`} key={index}>
              <div className="bubble">
                {msg.text} <span className="bubble-time">{msg.time}</span>
              </div>
              <div className={`sentiment ${msg.sentiment}`}>
                <span className="sentiment-dot"></span>{msg.sentiment}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
