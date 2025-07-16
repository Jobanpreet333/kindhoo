import React, { useState, useContext, useEffect } from 'react'
import axios from "axios"
import LoginContext from '../contexts/UserContext'
import NotificationsContext from '../contexts/NotificationsContext';
import { useNavigate, useLocation } from "react-router-dom";
import socket from '../utils/socket';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(LoginContext)
  const { currentUser, setCurrentUser } = useContext(LoginContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [feedbacks, setFeedBacks] = useState([]);
  const from = location.state?.from?.pathname || "/";
  const { notifications, setNotifications } = useContext(NotificationsContext)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/feedbackGet");
        setFeedBacks(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setFeedBacks([]);
      }
    }
    fetchFeedbacks();

  }, [])


  useEffect(() => {
    socket.on("receiveMessage", async ({ senderId, message }) => {
      if (window.location.pathname !== `/chat/${senderId}`) {
        try {
          const res = await axios.get(`http://localhost:5000/user/${senderId}`);
          const senderName = res.data.name;

          setNotifications(prev => ({
            ...prev,
            [senderId]: {
              name: senderName,
              count: (prev[senderId]?.count || 0) + 1,
              lastMessage: message
            }
          }));
        } catch (err) {
          console.error("Failed to fetch sender name", err);
        }
      }
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email, password
      }
      );
      setIsLoggedIn(true);
      setCurrentUser(response.data);
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{response.data.message}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      const user = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      console.log(currentUser);;

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        navigate(from, { replace: true });
      }

      navigate('/home');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <>
      <div className='container-fluid d-flex flex-row '>
        <div className="col-md-6 bg-light  bg-[#f9f9f9] d-flex flex-column justify-content-start p-5 overflow-y-scroll feeback">
          <h2 className="mb-4">Why People Love KindHood 💜</h2>

          {feedbacks.map((feedback, index) => (
            // if(feedback.rating >=3){
            <div key={index} class="mb-3 p-3 border rounded bg-white shadow-sm ">
              <p>{feedback.message}</p>
              <small>— {feedback.name}</small>
            </div>
            // }

          ))}

        </div>

<div className='loginAlert'>

</div>
        <div class="col-md-6 d-flex align-items-center justify-content-center p-5 ">

          <form onSubmit={handleFormSubmit}>
            <h4>One Step to Kindness</h4>
            <hr />

            <div className='form '>

              <div class="mb-4 mt-4">
                <input type="email" class="form-control" id="exampleInputEmail1" onChange={((e) => setEmail(e.target.value))} name="email" placeholder="Email" aria-describedby="emailHelp" />
              </div>
              <div class="mb-4">
                <input type="password" class="form-control" id="exampleInputPassword1" onChange={((e) => setPassword(e.target.value))} name="password" placeholder='Password' />
              </div>
            </div>
            <button type="submit" class="btn btn-primary ms-2">Submit</button>
            <p id='para3' class="text-muted text-center mt-2" >New here? <a href="/sign" >Create an account</a></p>
          </form>


        </div>
      </div >

    </>
  )
}

export default Login
