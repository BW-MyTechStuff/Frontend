import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import ItemView from "./ItemView";
import styled from "styled-components";

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
        <Container>
            <Topcontent>
                <h1>Browse Listings</h1>
                <button onClick={returnToDash}>Return to Dashboard</button>
            </Topcontent>
            
            {items.map(item => {
                return <ItemView key={item.itemid} item={item}/>
                
            })}
        </Container>
    )
}

export default BrowseListings

const Container = styled.div `
  width: 60%;
  margin: auto; 
  text-align: center;
  border: solid black;
  margin-top: 20px;
`
const Topcontent = styled.div ` 
    background-color: gray;
    padding: 20px 0px;
`