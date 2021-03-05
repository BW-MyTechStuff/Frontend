import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup"
import itemValidation from '../utils/form_validation/itemValidation'
import styled from "styled-components";

function EditItem() {

    const history = useHistory();
    const arr = history.location.pathname.split("/")
    const id = arr[2]

    

    useEffect(() => {
        const fetchItem = async() =>{
            const res = await axiosWithAuth().get(`/items/item/${id}`)
            const itemdata = res.data
            console.log("hi", itemdata)
            return setItem(itemdata)
        }
        // axiosWithAuth()
        //         .get(`/items/item/${id}`)
        //         .then(res => {
        //             console.log(res.data);
        //             setItem(res.data);
        //         })
        //         .catch(err => console.log({err}))
               fetchItem()
            }, [id])
    
    

    

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

    const [ disabled, setDisabled] = useState(true)
    const [ item, setItem ] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)

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
    
    const cancel = evt => {
        history.push("/user-dashboard")
    }

    const updateForm = (name, value) => {   
        setItem({...item, [name]:value})
    }
    const change = (evt) => {
        const { name, value } = evt.target
        validate(name, value);
        updateForm(name, value);
    }

    // let usrid = item.user.userid;
    // let usrname = item.user.username;
    // let usremail = item.user.email
    
    const formSubmit = (e) => { 
        const editedItem = {
            user: {
                userid: item.user.userid,
                userrole: {
                    userroleid: 1,
                    userroletype: "OWNER",
                },
                username: item.user.username,
                email: item.user.email,
            },
            itemname: item.itemname,
            itemdescription: item.itemdescription,
            itemcostperday: item.itemcostperday,
            itemstatus: {
                itemstatusid: 1,
                itemstatustype: item.itemstatus.itemstatustype,
            },
            numberofdaysrented: item.numberofdaysrented
            
        }

        axiosWithAuth()
            .put(`/items/item/${item.itemid}`, editedItem)
            .then(res => {
                console.log("res.data put", res.data);

            })
            .catch(err => console.log(err.message))
        setItem(initialValues); 
    }

    const submit = (e) => {
        e.preventDefault()
        formSubmit()
        history.push("/user-dashboard")
    }

    const deleteItem = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/items/item/${item.itemid}`)
            .then(() => {
                history.push("/user-dashboard")
            })
            .catch(err => console.log(err.message))

    }
   

    return (
        <Container>
            {(item ? 
            
            <div>
                
                <h1>{`Edit ${item.itemname}`}</h1>
                <form onSubmit = {submit}>
                    <label>Name:
                        <input name= 'itemname' type= 'text' onChange={change} value={item.itemname}/>
                    </label>
                    <label>Cost per day:
                        <input name= 'itemcostperday' type='number' step='0.01' onChange={change} value={item.itemcostperday}/>
                    </label>
                    <label>Availability:
                        <input name= 'availability' type='text' onChange={change} value={item.itemstatus.itemstatustype}/>
                    </label>
                    <label>Description:
                        <input name= 'itemdescription' type= 'text' onChange={change} value={item.itemdescription}/>
                    </label>
                    <button onClick={cancel}>Cancel</button>
                    <button disabled= {disabled} onClick={submit}>Edit Item</button>
                    <button onClick={deleteItem}>Delete Item</button>
                </form>
            </div> 
            
            : null)}
           
        </Container>
    )
}

export default EditItem

const Container = styled.div `
  width: 30%;
  margin: auto; 
  text-align: center;
`