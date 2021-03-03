import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    }, [BrowseListings])

    return (
        <div>
            {console.log(items)}
            {items.map(item => {
                return <div className="item-browse-card">
                            <p>{item.itemname}</p>
                            <p>{item.itemstatus.itemstatustype}</p>
                            <p>{item.itemcostperday + "$ per day"}</p>
                       </div>
 
            })}
        </div>
    )
}

export default BrowseListings