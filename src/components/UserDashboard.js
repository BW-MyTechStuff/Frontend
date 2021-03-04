import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import ItemCard from "./ItemCard";

export default function UserDashboard(props) {

    const [ user, setUser] = useState([])
    const userName = localStorage.getItem("name");
    const history = useHistory();

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

    const addNewButton = () => {
        history.push("/add-new-item")
    }


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
                    {/* {console.log(user.items)} */}
                    {(user.items ? user.items.map(item =>  <ItemCard key ={item.itemid} item={item}/>) : null)}
                    {/* {user.items.map(item => {
                        return <ItemCard item={item}/> 
                    })} */}
                    <br/>
                    <button onClick={addNewButton}>
                        Add New Item
                    </button>
                </div>
            </div>
        </>
    )
}