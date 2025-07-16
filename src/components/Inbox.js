import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../contexts/UserContext';

function Inbox() {
  const { currentUser } = useContext(LoginContext);
  const [chatUsers, setChatUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    axios.get(`http://localhost:5000/chatUsers/${currentUser._id}`)
      .then(res => setChatUsers(res.data))
      .catch(err => console.error(err));
  }, [currentUser]);

  const openChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="container mt-4">
      <h2>Inbox</h2>
      <ul className="list-group">
        {chatUsers.map(user => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => openChat(user._id)}
            style={{ cursor: 'pointer' }}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;
