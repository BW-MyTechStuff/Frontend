import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function UserDashBoard(props) {

    const [ user, setUser] = useState([])
    const userName = localStorage.getItem("name");

    useEffect(() => {
        axiosWithAuth()
        .get(`/users/user/name/${userName}`)
        .then(res => {
            console.log(userName);
            console.log(res.data);
            setUser(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

    return (
        <>
            <div className="user-profile">
                <h3>User Profile</h3>
                <p>{user.fname} {user.lname}</p>
                <p>{user.email}</p>
                <p>{user.userrole.userroletype}</p>
            </div>
            <button className='logout' onClick={props.logout}>Logout</button>
        </>
    )
}