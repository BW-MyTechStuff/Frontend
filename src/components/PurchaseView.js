import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function PurchaseView() {
    const history = useHistory();
    const arr = history.location.pathname.split("/")
    const id = arr[2]
    const [ item, setItem ] = useState("")

    useEffect(() => {
        
    axiosWithAuth()
            .get(`/items/item/${id}`)
            .then(res => {
                console.log(res.data);
                setItem(res.data);
            })
            .catch(err => console.log({err}))
           
        }, [])

    const back = () => {
        history.push("/browse-listings")
    }

    const rent = () => {
        history.push("/success-page")
    }
    
    return (
        
        <div>
            {(item ? <div>
                        <p>{item.itemname}</p>
                        <p>{item.itemdescription}</p>
                        <p>{item.user.fname + " " + item.user.lname}</p>
                        <button onClick={back}>Back</button>
                        <button onClick={rent}>Rent</button>
                    </div> 
                    
                    : <p>loading</p>)}
              
        </div>
    )
}
        

export default PurchaseView

