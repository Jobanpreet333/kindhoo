import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import LoginContext from '../contexts/UserContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
function Lend() {
  // const locations = useLocation();
  const [posts, setPosts] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const [statusMap, setStatusMap] = useState({});
  const handleStatusChange = (postId, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [postId]: newStatus }));
  };



  useEffect(() => {


    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lendhelp");
        console.log("Fetched posts:", res.data); // 🔍 Check this
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };

    fetchPosts();



  }, []);




  const handleStartChat = (post) => {
  const selectedUserId = post.userId; // Assuming post contains the creator's userId
  navigate(`/chat/${selectedUserId}`);
};
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  return (

    <>
      <div className='lend'>
        <h1> "Be the Reason Someone Smiles Today 💜"</h1>
        <h4>Offer help with groceries, errands, or just a kind conversation.</h4>
        <div className="cards row">
          {posts.map((post, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className='card h-100'>
                <div className="card-body">
                  <h5 className="card-title">{post.type}</h5>
                  <p className="card-text">{post.description}</p>
                
                  <select
                    value={statusMap[post._id] || "pending"}
                    onChange={(e) => handleStatusChange(post._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <h6>{post.location}</h6>
                  <button className="btn btn-primary" onClick={() => handleStartChat(post)}>I want to Help</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>



    </>
  )
}

export default Lend
