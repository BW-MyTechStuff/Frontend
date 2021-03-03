import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ItemView from "./ItemView";

function BrowseListings() {

    const [ items, setItems] = useState([])
    

    useEffect(() => {
    axiosWithAuth()
        .get("/items/items")
        .then(res => {
            // console.log(res.data);
            setItems(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

    

    return (
        <div>
            <h1>Browse Listings</h1>
            
            {items.map(item => {
                {console.log(items)}
                return <ItemView key={item.itemid} item={item}/>
                
            })}
        </div>
    )
}

export default BrowseListings