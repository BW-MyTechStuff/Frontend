import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div className='home-wrapper'>
        <nav> 
            <h1>Use My Tech Stuff</h1>
        </nav>
        <div className='item-wrapper'>
            <div className='link-group'>
            <Link className='link' to='/login'>
                <p>Login</p>
            </Link>
            <Link className='last-link' to='/sign-up'>
                <p>Sign Up</p>
            </Link>
            </div>
        </div>
    </div>
)
}

export default LandingPage;

