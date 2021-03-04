import React from 'react'

function EditItem() {
   
    // const initialValues = {
    //     itemName: '',
    //     costPerDay:'',
    //     availability: '',
    //     description: '',
    // }

    // const initialErrors = {
    //     itemName: '',
    //     costPerDay:'',
    //     availability: '',
    //     description: '',
    // }
    
    // const [item, setItem] = useState({})
    // const [values, setValues] = useState(initialValues)
    // const [errors, setErrors] = useState(initialErrors)
        
    // const postItem = newItem => {
    //     axios.post('https://usemytechstuff-tt26.herokuapp.com/items/item', newItem)
    //     .then(res => {
    //       setItem([...item, res.data])
    //       console.log(res.data)
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     setValues(initialValues)
    // }

    // const submit = evt => {
    //     const newItem = {
    //         itemName: values.itemName,
    //         costPerDay: values.costPerDay,
    //         availability: values.availability,
    //         description: values.description,
    //     }
    //     postItem(newItem)
    //     setValues(initialValues)
    // }

    // const cancel = evt => {
    //       setValues(initialValues)
    // }

    return (
        <div>
            <h1>Add New Item</h1>
            {/* <form onSubmit = {submit}>
                <label>
                    <input name= 'itemName' type= 'text' onChange={change} value= {values.itemName}/>
                </label>
                <label>
                    <input name= 'costPerDay' type= 'text' onChange={change} value= {values.costPerDay}/>
                </label>
                <label>
                    <input name= 'availability' type= 'text' onChange={change} value= {values.availability}/>
                </label>
                <label>
                    <input name= 'description' type= 'text' onChange={change} value= {values.description}/>
                </label>
                <button onClick={cancel}> Cancel</button>
                <button onClick={submit}>Save</button>
                <button>Delete</button>
            </form> */}
        </div>
    )
}

export default EditItem