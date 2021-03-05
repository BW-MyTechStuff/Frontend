import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

function RentView() {
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
           
        }, [id])

    const back = () => {
        history.push("/browse-listings")
    }

    const rent = () => {
        history.push("/success-page")
    }
    
    return (
        
        <Container>
            {(item ? <div>
                        <h3>{item.itemname}</h3>
                        <p>{`Item Description: ${item.itemdescription}`}</p>
                        <p>{`${item.itemstatus.itemstatustype}`}</p>
                        <p>{`Cost per week: ${item.itemcostperday}$`}</p>
                        <h3>Owner Contact:</h3>
                        <p>{`Name: ${item.user.fname} ${item.user.lname}`}</p>
                        <p>{`Email: ${item.user.email}`}</p>
                        <button onClick={back}>Back</button>
                        <button onClick={rent}>Rent {`${item.itemcostperday}$`}</button>
                    </div> 
                    
                    : <p>loading</p>)}
              
        </Container>

    )
}
        

export default RentView

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
  background-color: #1D817F;
  margin-top: 20px;
  padding: 2%;
  border-radius: 10px;
`

