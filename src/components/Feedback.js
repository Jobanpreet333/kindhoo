import React, { useState } from "react";
import axios from "axios"
function Feedback() {
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     rating: "",
    //     feedbackType: "",
    //     message: "",
    //     recommend: "",
    //     followUp: false,
    // });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [feedbackType, setFeedbackType] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/feedback", {
                name, email, rating, feedbackType, message
            });
            alert(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }


    };

    return (

        <>
            <div className="feedback">
                <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto bg-white shadow-md rounded">
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#A78BFA]">  Your Voice Shapes KindHood 💜</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name "
                        onChange={((e) => setName(e.target.value))}
                        className="form-control mb-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={((e) => setEmail(e.target.value))}

                        className="form-control mb-3"
                    />

                    <select
                        name="rating"
                        onChange={((e) => setRating(e.target.value))}

                        className="form-select mb-3"
                    >
                        <option value="">Rate your experience</option>
                        <option value="5">😍 Excellent</option>
                        <option value="4">😊 Good</option>
                        <option value="3">😐 Average</option>
                        <option value="2">😕 Poor</option>
                        <option value="1">😠 Terrible</option>
                    </select>

                    <select
                        name="feedbackType"
                        onChange={((e) => setFeedbackType(e.target.value))}
                        className="form-select mb-3"
                    >
                        <option value="">What is your feedback about?</option>
                        <option value="bug">🐞 Report a Bug</option>
                        <option value="feature">✨ Suggest a Feature</option>
                        <option value="user">👥 Report a User</option>
                        <option value="experience">📝 General Experience</option>
                    </select>

                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Tell us more..."
                        onChange={((e) => setMessage(e.target.value))}
                        className="form-control mb-3"
                    />


                    <button type="submit" className="btn btn-primary w-100">Send Feedback</button>
                </form>
            </div>
        </>
    );
}

export default Feedback;
