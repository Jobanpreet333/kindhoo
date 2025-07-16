import React, { useState,useEffect } from 'react'
import {useNavigate} from "react"
import axios from "axios"
function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [suggestions, setSuggestions] = useState("");
const navigate=useNavigate();

 const [feedbacks, setFeedBacks] = useState([]);

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




  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length < 3) {
      setSuggestions([]);
    }

    try {
      const response = await fetch(`https://api.locationiq.com/v1/autocomplete?key=pk.9095967821c7022d1cb599cb19451be8&q=${value}&limit=5&format=json`);
      const resData = await response.json();
      if (!resData.error) {
        setSuggestions(resData);
      }
      else {
        setSuggestions([]);
      }
    } catch (error) {
      console.log(error);
    }




  }
const handleSelectSuggestion = (place) => {
    setAddress(place.display_name);
    setSuggestions([]);
    const address=place.address;
    setPin(address.postcode);
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {

const verifyRes = await axios.get("https://emailvalidation.abstractapi.com/v1/", {
      params: {
        api_key: "3091558196204d0b8262dea5c5b6d1d5", // Replace with your actual API key
        email: email,
      },
    });

    if (verifyRes.data.deliverability !== "DELIVERABLE") {
      alert("Invalid email address. Please enter a valid email.");
      return;
    }



    const response = await axios.post("http://localhost:5000/sign", {
      name,
      email,
      password,
      address,
      pin,
    });

    alert(response.data.message);
    navigate('/');
  } catch (error) {
    console.log("Axios error:", error);

    // Show backend error message if available
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div>
      <div className='container-fluid d-flex flex-row'>
        <div className="col-md-6 bg-light  bg-[#f9f9f9] d-flex flex-column justify-content-start p-5 overflow-y-scroll feeback">
          <h2 class="mb-4">Why People Love KindHood 💜</h2>
           {feedbacks.map((feedback, index) => (
            <div key={index} class="mb-3 p-3 border rounded bg-white shadow-sm ">
              <p>{feedback.message}</p>
              <small>— {feedback.name}</small>
            </div>

          ))}
        </div>


        <div class="col-md-6 d-flex align-items-center justify-content-center p-5 ">

          <form onSubmit={handleFormSubmit}>
            <h4>One Step to Kindness</h4>
            <hr />

            <div className='form '>

              <div class="mb-4 mt-4">
                <input type="text" class="form-control" name='name' placeholder="Name" aria-describedby="emailHelp" onChange={((e) => setName(e.target.value))} />
              </div>
              <div class="mb-4 mt-4">
                <input type="email" class="form-control" name="email" id="exampleInputEmail1" placeholder="Email" onChange={((e) => setEmail(e.target.value))} aria-describedby="emailHelp" />
              </div>
              <div class="mb-4">
                <input type="password" class="form-control" name="password" id="exampleInputPassword1" onChange={((e) => setPassword(e.target.value))} placeholder='Password' />
              </div>
              <div class="mb-4">
             <  input
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Address"
            autoComplete="off"
            className="form-control"
          />

                {suggestions.length > 0 && (
                  <ul

                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      border: '1px solid #ccc',
                      position: 'absolute',
                      width: '30%',
                      backgroundColor: 'white',
                      zIndex: 10
                    }}
                  >

                    {suggestions.map((place, index) => 
                    (
                      <li
                        key={index}
                        onClick={() => handleSelectSuggestion(place)}
                        style={{
                          padding: '8px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #eee',
                        }}>
                        {place.display_name}
                      </li>

                    ))}

                  </ul>
                )}
              </div>
              <div class="mb-4">
                <input type="location" class="form-control" name="pin" id="exampleInputPassword1" value={pin}             onChange={(e) => setPin(e.target.value)} placeholder='Enter your Pincode' />
              </div>
            </div>
            <button type="submit" class="btn btn-primary ms-2">Submit</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Sign
