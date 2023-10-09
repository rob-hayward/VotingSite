import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to our website!</h1>
            <p>If you are new here, please <Link to="/register">register</Link> to enjoy our services.</p>
            <p>If you already have an account, <Link to="/login">login</Link> to access your dashboard and other personalized features.</p>
        </div>
    );
}

export default Home;
