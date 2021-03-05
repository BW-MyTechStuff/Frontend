import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function EditItem() {

    const history = useHistory();
    const arr = history.location.pathname.split("/")
    const id = arr[2]

    useEffect(() => {
        
        // axiosWithAuth()
        //         .get(`/items/item/${id}`)
        //         .then(res => {
        //             console.log(res.data);
        //             setItem(res.data);
        //         })
        //         .catch(err => console.log({err}))
               fetchItem()
            }, [])
    
            const fetchItem = async() =>{
                const res = await axiosWithAuth().get(`/items/item/${id}`)
                const itemdata = res.data
                console.log("hi", itemdata)
                return setItem(itemdata)
            }

    

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

    const [ item, setItem ] = useState(initialValues)

    
    const cancel = evt => {
        history.push("/user-dashboard")
    }

    const updateForm = (name, value) => {   
        setItem({...item, [name]:value})
    }
    const change = (evt) => {
        const { name, value } = evt.target
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
        <div >
            {(item ? 
            
            <div className='home-wrapper'>
                <nav>
                    <h1>{`Edit ${item.itemname}`}</h1>
                </nav>
                <div className='item-wrapper'> 
                <form className='form' onSubmit = {submit}>
                <div className='from-group'>
                    <label className='form-row'>
                        <p>Name:</p>
                        <input name= 'itemname' type= 'text' onChange={change} value={item.itemname}
                        placeholder/>
                    </label>
                    <label className='form-row'>
                        <p>Cost per day:</p>
                        <input name= 'itemcostperday' type='number' step='0.01' onChange={change} value={item.itemcostperday}/>
                    </label>
                    <label className='form-row'>
                        <p>Availability:</p>
                        <input name= 'availability' type='text' onChange={change} value={item.itemstatus.itemstatustype}/>
                    </label>
                    <label className='form-row'>
                    <p>Description:</p>
                        <input name= 'itemdescription' type= 'text' onChange={change} value={item.itemdescription}/>
                    </label>
                    <div className='buttons'>
                        <div className='form-button'>
                            <button onClick={deleteItem}>Delete Item</button>
                            </div>
                        <div className='form-button'>
                            <button onClick={submit}>Edit Item</button>
                        </div>
                        <div className='form-button'>
                            <button onClick={cancel}>Cancel</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div> 
            
            </div>
            : null)}
        </div>
    )
}

export default EditItem