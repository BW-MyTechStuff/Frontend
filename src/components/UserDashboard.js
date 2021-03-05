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
    }, [userName])

    const addNewButton = () => {
        history.push("/add-new-item")
    }
console.log(user.fname)
    return (
        <div className='user-dashboard-wrapper'>
            <div className='user-nav'>
            <nav >
                <h1>User Profile</h1>
            </nav>
            </div>
            <div className='main-container'>

            <div className='left-container'>
                <div className="user-profile">
                    
                    <h3>{user.fname} {user.lname}</h3>
                    <p>{user.email}</p>
                    {/* <p>{user.userrole.userroletype}</p> */}
                    {/* {(user.userrole.userroletype ? user.userrole.userroletype : null)} */}
                    <div className='buttons'>
                        <div className='form-button'>
                            <button className='logout' onClick={props.logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
    
                <Link to='/browse-listings'>
                    <h2>Browse Listings</h2>
                </Link>
            <div className='right-container'>
    
            <div className="">
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
                <div className='buttons'>
                    <div className='form-button'>
                        <button onClick={addNewButton}>
                            Add New Item
                        </button>
                    </div>
                </div>
    
                    
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}