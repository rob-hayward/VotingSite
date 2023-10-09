import React, { useState, useContext } from 'react';
import axiosInstance from '../axiosConfig';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // 2. Call the hook
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
            const response = await axiosInstance.post('/auth/jwt/create/', payload);
            console.log(response.data);
            localStorage.setItem('access_token', response.data.access);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            setMessage("Successfully logged in!");
            setIsSuccess(true);
            login();

            navigate('/dashboard'); // 3. Redirect to dashboard after login

        } catch (error) {
            console.error("Error during login:", error.response.data);
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || "An error occurred during login. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            setIsSuccess(false);
        }
    }

    // Return should be within the function
    return (
        <div>
            <h2>Login</h2>
            {message && <div className={isSuccess ? "success-message" : "error-message"}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
