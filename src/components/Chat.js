import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import LoginContext from '../contexts/UserContext';
import getRoomId from '../utils/getRoomId';
import NotificationsContext from '../contexts/NotificationsContext';

const socket = io("http://localhost:5000",{
   transports: ["websocket", "polling"]
});

function Chat() {
  const { userId: selectedUserId } = useParams();
  const { currentUser } = useContext(LoginContext);
  const { notifications } = useContext(NotificationsContext);

  const navigate = useNavigate();

  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);

  const messagesEndRef = useRef(null);

  // 📩 Auto-scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // 🟣 Fetch chat users (inbox list)
  useEffect(() => {
    if (!currentUser) return;
    axios.get(`http://localhost:5000/chatUsers/${currentUser._id}`)
      .then(res => setChatUsers(res.data))
      .catch(err => console.error(err));
  }, [currentUser]);

  // 🟣 Fetch selected user name
  useEffect(() => {
    if (!selectedUserId) return;
    axios.get(`http://localhost:5000/user/${selectedUserId}`)
      .then(res => setReceiverName(res.data.name))
      .catch(err => console.error("Error fetching user name", err));
  }, [selectedUserId]);

  // 🟣 Handle socket setup, join room & fetch messages
  useEffect(() => {
    if (!currentUser || !currentUser._id || !selectedUserId) return;

    const roomId = getRoomId(currentUser._id, selectedUserId);

    // Join the chat room
    socket.emit("joinRoom", {
      senderId: currentUser._id,
      receiverId: selectedUserId
    });

    // Fetch previous messages
    axios.get(`http://localhost:5000/messages/${roomId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.log("Fetching message error:", err));

    // Listen for new messages
    const handleReceive = (data) => {
      setMessages(prev => [...prev, data]);
    };

    socket.on("receiveMessage", handleReceive);

    // Clean up listener only
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [currentUser, selectedUserId]);

  // 🟣 Send a message
  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: selectedUserId,
      message
    });

    setMessage("");
  };

  // 🟣 Navigate to chat on click
  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="container-fluid d-flex flex-row">
      <div className="col-md-4 bg-light p-4 overflow-y-scroll" style={{ height: '100vh' }}>
        <h4>Inbox</h4>
        {chatUsers.map(user => (
          <div className='names'>
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => navigate(`/chat/${user._id}`)}
          >
           
            <div className='name' style={{ height: '8vh'}}>{user.name}</div>
            {notifications[user._id]?.count > 0 && (
              <span className="badge bg-danger rounded-pill">
                {notifications[user._id].count}
              </span>
            )}
          </li>
          </div> 
         ))}

      </div>

      <div className="col-md-8 d-flex flex-column p-4">
        <div className="mb-3">
          <h4>Chat with: {receiverName || "..."}</h4>
        </div>

        <div className="chat-box flex-grow-1 border rounded p-3 mb-3 overflow-auto" style={{ minHeight: "60vh" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.senderId === currentUser._id ? 'text-end' : 'text-start'}`}>
              <strong>{msg.senderId === currentUser._id ? "You" : receiverName}</strong>: {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
