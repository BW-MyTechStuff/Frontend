import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function UserDashboard(props) {

    const [ user, setUser] = useState([])
    const userName = localStorage.getItem("name");

    useEffect(() => {
    axiosWithAuth()
        .get(`/users/user/name/${userName}`)
        .then(res => {
            // console.log(userName);
            // console.log(res.data);
            setUser(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

    


    return (
        <>
            <div className="user-profile">
                <div>
                    <h3>User Profile</h3>
                    <p>{user.fname} {user.lname}</p>
                    <p>{user.email}</p>
                    {/* <p>{user.userrole.userroletype}</p> */}
                    {/* {(user.userrole.userroletype ? user.userrole.userroletype : null)} */}
                </div>
                <button className='logout' onClick={props.logout}>Logout</button>
            </div>
            <br />
            <div>
                <Link to='/browse-listings'>
                    <p>Browse Listings</p>
                </Link>
            </div>
            <br />
            <div className="listing-container">
                {/* <div className="currently-renting">
                        not sure if this is possible rn
                    </div> */}
                <div className="owner-listings">
                    <h3>My Listed Items</h3>
                    <Link to="edit-item">
                        {(user.items ? user.items.map(item => {return item.itemname}) : null)}
                    </Link>
                    <Link to="/add-new-item" >
                        <p>Add New Item</p>
                    </Link>
                </div>
            </div>
        </>
    )
}