import React, { useState, useEffect}  from 'react'
import axios from 'axios'
import * as yup from "yup"
import formSchema from "../utils/form_validation/loginValidation";
import { useHistory } from "react-router-dom";


const initialValues = {
    username: '',
    password:'',
}
const initialErrors = {
    username: '',
    password:'',
}

const initialDisabled = true

function Login(props) {
  const history = useHistory();

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(initialErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const update = (name, value) => {
        yup
          .reach(formSchema, name)
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



      const submit = (e) => {
        e.preventDefault();
        axios
          .post(
            "https://usemytechstuff-tt26.herokuapp.com/login",
            `grant_type=password&username=${values.username}&password=${values.password}`, 
            {
              headers: {
                Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            },
          )
          .then((res) => {
            // console.log("res.data log:", res.data);
            props.setIsLoggedIn(true);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("name", values.username);
            props.history.push("/user-dashboard");
            // console.log(localStorage.getItem("name"));
          })
          .catch((err) => console.log({err}))
      };




      const change = (evt) => {
        const { name, value } = evt.target;
        update(name, value);
      };

      const toSignUp = () => {
        history.push("/sign-up")
    }
      
      

    return (
      <div className='home-wrapper'>
         <nav>
          <h1>Sign In</h1>
         </nav>
           
          <form className='form' onSubmit = {submit}>
          <div className='from-group'>
              <label className='form-row'>
                  <input name= 'username' type= 'text' onChange={change} value= {values.username} 
                  placeholder='Username'/>
              </label>
              <label className='form-row'>
                  <input name= 'password' type= 'password' onChange={change} value= {values.password}
                  placeholder='Password'/>
              </label>
              <div className='buttons'>
                <div className='form-button'>
              <button disabled={disabled}>Login</button>
              </div>
              </div>
              <div>
                <div>{errors.username}</div>
                <div>{errors.password}</div>
              </div>
          <div className='span' onClick={toSignUp}>No Account yet? <span>Sign up here</span></div>
          </div>
          </form>  
      </div>
  )
}

export default Login

