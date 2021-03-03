import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <h1>Use My Tech Stuff</h1>
            <Link to='/login'>
                <p>Login</p>
            </Link>
            <Link to='/sign-up'>
                <p>Sign Up</p>
            </Link>
        </div>
    )
}

export default LandingPage