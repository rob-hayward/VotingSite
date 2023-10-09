import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';


function Dashboard() {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome back!</h1>
            <p>You are now in your personalized dashboard where you can access all your features and content. Enjoy your time here!</p>

            <div className="dashboard-options">
                {/* Option 1 */}
                <div className="option">
                    <h2>Vote on stuff and things.</h2>
                    <Link to="/dashboard/display_votables">
                        <button>Vote Now</button>
                    </Link>
                </div>

                {/* Option 2 */}
                <div className="option">
                    <h2>Create stuff and things to vote on.</h2>
                    <Link to="/dashboard/create_votable">
                        <button>Create Now</button>
                    </Link>
                </div>
            </div>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;

