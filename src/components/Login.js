import React, { useState, useEffect}  from 'react'
import axios from 'axios'
import * as yup from yup

function Login() {

    const initialValues = {
        username: '',
        password:'',
    }

    const initialErrors = {
        username: '',
        password:'',
    }

    const initialDisabled = true

    const [login, setLogin] = useState({})
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const change = (name, value) => {
        yup.reach(formSchema, name)
          .validate(value)
          .then(() => {
            setErrors({...errors, [name]: ''})
          })
          .catch(err => {
            setErrors({...errors, [name]: err.errors[0]})
          })
        setValues({
          ...values,
          [name]: value 
        })
      }

      useEffect(() => {
        formSchema.isValid(values).then(valid => setDisabled(!valid))
      }, [values])

      const postLogin = newLogin => {
        axios.post('https://usemytechstuff-tt26.herokuapp.com/users/user', newLogin)
        .then(res => {
          setLogin([...login, res.data])
        })
        .catch(err => {
          console.log(err);
        })
        setValues(initialValues)
      }

      const submit = evt => {
        const newLogin = {
          name: values.name,
          password: values.password
        }
        postLogin(newLogin)
        setValues(initialValues)
      }
      
      

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit = {submit}>
                <label>Username
                    <input name= 'username' type= 'text' onChange={change} value= {values.username}/>
                </label>
                <label>Password
                    <input name= 'password' type= 'text' onChange={change} value= {values.password}/>
                </label>
                <button disabled={disabled}>Login</button>
            </form>  
        </div>
    )
}

export default Login