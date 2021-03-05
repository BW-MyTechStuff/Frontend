import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import ItemView from "./ItemView";

function BrowseListings() {

    const [ items, setItems] = useState([]);
    const history = useHistory();
    

    useEffect(() => {
    axiosWithAuth()
        .get("/items/items")
        .then(res => {
            // console.log(res.data);
            setItems(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

    const returnToDash = () => {
        history.push("/user-dashboard")
    }

    return (
        <div className='home-wrapper'>
            <nav>
                <h1>Browse Listings</h1>
            </nav>

            <button onClick={returnToDash}>Return to Dashboard</button>
            <div className='item-wrapper'>
            {items.map(item => {
                return <ItemView key={item.itemid} item={item}/>
                
            })}
        </div>
        </div>
    )
}

export default BrowseListings