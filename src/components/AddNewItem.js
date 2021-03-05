import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup"
import itemValidation from '../utils/form_validation/itemValidation'
import styled from "styled-components";

const initialDisabled = true

// working

function AddNewItem() {

    const userName = localStorage.getItem("name");
    const [ user, setUser] = useState({})

    useEffect(() => {                       // this data can be passed in through props instead
    axiosWithAuth()
        .get(`/users/user/name/${userName}`)
        .then(res => {
            // console.log(userName);
            // console.log(res.data);
            setUser(res.data);
        })
        .catch(err => console.log({err}))
    }, [])

    let id = user.userid;
    let usrname = user.username;
    let usremail = user.email

    const initialValues = {
        itemname: "",
        itemcostperday: 0.00,
        itemstatus: {
            itemstatusid: 1,
            itemstatustype: "Available"
        },
        itemdescription: "",
        numberofdaysrented: 0
    }
    
    const initialErrors = {
        itemname: "",
        itemcostperday: 0.00,
        itemstatus: {
            itemstatusid: 1,
            itemstatustype: "Available"
        },
        itemdescription: "",
        numberofdaysrented: 0
    }


    const [item, setItem] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    const history = useHistory();
    
    const updateForm = (name, value) => {   
        setItem({...item, [name]:value})
    }

    const validate = (name, value) => {
        yup
          .reach(itemValidation, name)
          .validate(value)
          .then(() => {
            setErrors({...errors, [name]: ''})
          })
          .catch(err => {
            setErrors({...errors, [name]: err.errors[0]})
          })
        setItem({
          ...item,
          [name]: value 
        })
    }
    
    useEffect(() => {
        itemValidation.isValid(item).then(valid => setDisabled(!valid))
    }, [item])
    
    const change = (evt) => {
        const { name, value } = evt.target
        validate(name,value);
        updateForm(name, value);
    }

    const postItem = newItem => {
        axios.post('https://usemytechstuff-tt26.herokuapp.com/items/item', newItem)
        .then(res => {
          setItem([...item, res.data])
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        })

    }


    
    // i would suggest using a get request to get current userr by id (u can find this in local storage) and then 
    // set it to a variable in order to get add neceessasry info to new item obj in submit 

    const addItem = evt => {
        const newItem = {
            user: {
                userid: id,
                userrole: {
                    userroleid: 1,
                    userroletype: "OWNER",
                },
                username: usrname,
                email: usremail,
            },
            itemname: item.itemname,
            itemcostperday: item.itemcostperday,
            itemstatus: {
                itemstatusid: 1,
                itemstatustype: "Available"
            },
            itemdescription: item.itemdescription,
            numberofdaysrented: 0
        }
        console.log(newItem)
        postItem(newItem)
        
    }

    const cancel = evt => {
        history.push("/user-dashboard")
    }

    const submit = e => {
        e.preventDefault();
        addItem()
        history.push("/user-dashboard")
    }
    console.log(item)

    return (
        <Container>
            <h1>Add New Item</h1>
            <form onSubmit = {submit}>
                <label>Name:
                    <input name= 'itemname' type= 'text' onChange={change} value={item.itemName}/>
                </label>
                <label>Cost per day:
                    <input name= 'itemcostperday' type='number' step='0.01' onChange={change} value={item.costPerDay}/>
                </label>
                <label>Availability:
                    <input name= 'numberofdaysrented' type='number' onChange={change} value={item.availability}/>
                </label>
                <label>Description:
                    <input name= 'itemdescription' type= 'text' onChange={change} value={item.description}/>
                </label>
                <button onClick={cancel}>Cancel</button>
                <button disabled={disabled} onClick={submit}>Add Item</button>
            </form>
        </Container>
    )
}

export default AddNewItem

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
`