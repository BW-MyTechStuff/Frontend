import React from 'react'


function AddNewItem() {

    const initialValues = {
        itemName: '',
        costPerDay:'',
        availability: '',
        description: '',
    }

    const initialErrors = {
        itemName: '',
        costPerDay:'',
        availability: '',
        description: '',
    }

    const initialDisabled = true

    const [item, setItem] = useState({})
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    
    const postItem = newItem => {
        axios.post('https://usemytechstuff-tt26.herokuapp.com/items/item', newItem)
        .then(res => {
          setItem([...item, res.data])
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        })
        setValues(initialValues)
    }

    const submit = evt => {
        const newItem = {
            itemName: values.itemName,
            costPerDay: values.costPerDay,
            availability: values.availability,
            description: values.description,
        }
        postItem(newItem)
        setValues(initialValues)
    }

    const cancel = evt => {
          setValues(initialValues)
    }

    return (
        <div>
            <h1>Add New Item</h1>
            <form onSubmit = {submit}>
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
            </form>
        </div>
    )
}

export default AddNewItem