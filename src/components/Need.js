import React, { useContext, useState,useEffect } from 'react'
import axios from "axios"
import LoginContext from '../contexts/UserContext';
import { Navigate,useLocation } from "react-router-dom"; 
function Need() {
    const [helpType, setHelpType] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState("");
    const {isLoggedIn,setIsLoggedIn} = useContext(LoginContext)
    const {currentUser,setCurrentUser} = useContext(LoginContext)
// const location = useLocation();

// if (!isLoggedIn) {
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }
useEffect(() => {
  console.log("🧠 currentUser:", currentUser);
}, [currentUser]);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:5000/needhelp", {
                
                name, contact, type, description, locations,userId:currentUser._id
            });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

      
            <div className='need'>
                <h1> “Need a Hand?” or “Request Help from Your Neighbors 💜”</h1>
                <h4>"Post your request here and kind neighbors will reach out to help.”</h4>
                <form onSubmit={handleFormSubmit}>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="name" placeholder='Name' onChange={((e) => setName(e.target.value))} />
                    </div>
                    <div class="mb-3">
                        <input type="tel" class="form-control" name="contact" placeholder='Contact Number' onChange={((e) => setContact(e.target.value))} />
                    </div>

                    <label htmlFor="helpType" name="type"  ></label>
                    <select
                        id="helpType"
                        value={type}

                        name="type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select Help Type </option>
                        <option value="🛒 Groceries">🛒 Groceries</option>
                        <option value="💊 Medicines">💊 Medicines</option>
                        <option value="🚕 Transport">🚕 Transport</option>
                        <option value="📞 Companionship">📞 Companionship</option>
                        <option value="🧰 Small Repairs">🧰 Small Repairs</option>
                        <option value="🧹 Household Help">🧹 Household Help</option>
                        <option value="📚 Education Help">📚 Education Help</option>
                        <option value="🧾 Form Filling / Online Help">🧾 Form Filling / Online Help</option>
                        <option value="🐶 Pet Help">🐶 Pet Help</option>
                        <option value="🍽️ Meal Delievery">🍽️ Meal Delivery</option>
                        <option value="❓ Other">❓ Other</option>
                    </select>
                    <div class="mb-3" >
                        <input type="text" class="form-control" name="description" placeholder='Description' onChange={((e) => setDescription(e.target.value))} />
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="locations" id="exampleInputEmail1" onChange={((e) => setLocations(e.target.value))} aria-describedby="emailHelp" placeholder='Location' />
                    </div>


                    <button type="submit" class="btn btn-primary">POST</button>
                </form>
            </div> 
            
          
            
            
        </>
    )
}

export default Need
