import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import ItemCard from "./ItemCard";
import styled from "styled-components";

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
        <Container>
            <Userprofile className="user-profile">
                <div>
                    <Userh3>User Profile</Userh3>
                    <p>{user.fname} {user.lname}</p>
                    <p>{user.email}</p>
                    {/* <p>{user.userrole.userroletype}</p> */}
                    {/* {(user.userrole.userroletype ? user.userrole.userroletype : null)} */}
                </div>
                <button className='logout' onClick={props.logout}>Logout</button>
            </Userprofile>
        </Container>
            <br />
            <Linktest>
                <Link to='/browse-listings'>
                    <h3>Browse Listings</h3>
                </Link>
            </Linktest>
            <Breakline />
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
                    <br />
                    <Breakline />
                    <br />
                    <button onClick={addNewButton}>
                        Add New Item
                    </button>
                </div>
            </div>
        </>
    )
}

const Container = styled.div `
  width: 50%;
  margin: auto; 
  text-align: center;
  background-color: #1D817F;
  padding: 20px;
  margin-top: 30px;
  border-radius: 10px;
`

const Userprofile = styled.div ` 
    background-color: #2E3842;
    border-radius: 10px;
    padding-bottom: 2%;
`

const Userh3 = styled.h3 `
    /* color: #1C1C1C; */
`
const Linktest = styled.p ` 
    border: solid white;
    border-radius: 10px;
    width: 30%;
    margin: auto;
    padding: 2%;
    margin-top: 5%;
    margin-bottom: 3%;
`

const Breakline = styled.div ` 
    border: solid black;
    width: 80%;
    margin: auto;
`
// background-color: #B3FEFE;