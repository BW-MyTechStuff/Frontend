import React, { useState, useEffect}  from 'react'
import axios from 'axios'
import * as yup from "yup"
import formSchema from "../utils/form_validation/itemValidation";
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
        <div>
            <h1>Sign In</h1>
            <form onSubmit = {submit}>
                <label>Username
                    <input name= 'username' type= 'text' onChange={change} value= {values.username}/>
                </label>
                <label>Password
                    <input name= 'password' type= 'password' onChange={change} value= {values.password}/>
                </label>
                <button disabled={disabled}>Login</button>
                <div>
                  <div>{errors.username}</div>
                  <div>{errors.password}</div>
                </div>
            </form>  
            <div onClick={toSignUp}>No Account yet? Sign up here</div>
        </div>
    )
}

export default Login