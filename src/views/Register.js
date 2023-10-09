import React, { useState, useContext } from 'react';
import axiosInstance from '../axiosConfig'; // Adjust the import to use the configured axios instance
import AuthContext from '../AuthContext';

function Register() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                email,
                password
            };
            const response = await axiosInstance.post('/auth/users/', payload); // Using the configured axios instance
            console.log(response.data);
            login();
        } catch (error) {
            console.error("Error during registration:", error.response.data);
            if (error.response && error.response.data) {
                // Displaying the specific error message sent from the server
                setMessage(error.response.data.detail || "An error occurred during registration. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {message && <div className={isSuccess ? "success-message" : "error-message"}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
