import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import axios from 'axios'
import SignUpValidation from '../utils/form_validation/SignUpValidation';

const initialFormValues = {
    userrole:{
        userroleid: 0,
        userroletype: "",
    },
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  }
  
const initialFormErrors= {
    userrole:{
        userroleid: 0,
        userroletype: "",
    },
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  }
  
const initialDisabled = true;

function SignUp() {
    const [formValues, setFormValues] = useState(initialFormValues) 
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled);
    const history = useHistory();
    
      const postNewUser = (userInfo) => {
        axios
          .post("https://usemytechstuff-tt26.herokuapp.com/users/user", userInfo)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        SignUpValidation.isValid(formValues).then(valid => {
          console.log(valid)
          return setDisabled(!valid)}
       )}, [formValues])

    const onSubmit = (event) => {
        event.preventDefault()
        postNewUser(finalForm);
        history.push("/")
    }
    
    const inputChange = (name, value) => {
      yup.reach(SignUpValidation, name)
    .validate(value)
    .then(()=> {
      setFormErrors({...formErrors, [name]: ''})
    })
    .catch(err => {
      setFormErrors({...formErrors, [name]: err.errors[0]})
    })
      setFormValues({...formValues, [name]: value})
      
    }
      const onChange = evt => {
        const { name, value } = evt.target;
        inputChange(name, value);
      }

    const clickBack = () => {
        history.push("/")
    }

    const owner = {
      userrole: {
        userroleid: 1,
        userroletype: "OWNER"
      }
    }
    const renter = {
      userrole: {
        userroleid: 2,
        userroletype: "RENTER"
      }
    }

  let finalForm;
  if(formValues.userrole === "1") finalForm = {...formValues, ...owner};
  if(formValues.userrole === "2") finalForm = {...formValues, ...renter};

  return (
    <div className='home-wrapper'>
      <nav><h2>Sign Up</h2> </nav>
      <div className='item-wrapper'>
        <form className='form'  onSubmit={onSubmit}>
          <div>
            {/* <div className='form-group submit'> */}
            <div className='errors'>  
                <div>{formErrors.fname}</div>
                <div>{formErrors.lname}</div>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
                <div>{formErrors.userrole.type}</div>
            </div>      
            <div className='from-group'>
              <label className='form-row' >
                <input 
                  type="text"
                  onChange={onChange}
                  placeholder="First Name"
                  name="fname"
                  value={formValues.fname}
                />
              </label>
              <label className='form-row'>
                <input
                  type="text"
                  onChange={onChange}
                  placeholder="Last Name"
                  name="lname"
                  value={formValues.lname}
                />
              </label>
              <label className='form-row'>
                <input
                  type="text"
                  onChange={onChange}
                  placeholder="Username"
                  name="username"
                  value={formValues.username}
                  />
              </label>
              <label className='form-row'>
                <input
                  type="email"
                  onChange={onChange}
                  placeholder="E-mail"
                  name="email"
                  value={formValues.email}
                  />
              </label>
              <label className='form-row'>
                <input
                  type="password" 
                  onChange={onChange}
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  />
              </label >
              
              <label className='form-row' >
                <p>Account Role </p>
                <select name="userrole" value={formValues.userrole} onChange={onChange}>
                  <option value="none">----Select----</option>
                  <option value={1}>OWNER</option>
                  <option value={2}>RENTER</option>
                </select>
              </label>
            </div>
          </div>
          <div className='buttons'>
            <div className='form-button'>
              <button disabled={disabled}>Sign Up</button>
            </div>
            <div className='form-button'> 
            <button onClick={clickBack}>Back</button>
            </div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;