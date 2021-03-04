import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios'

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
  
const initialDisabled = true;

function SignUp() {
    const [formValues, setFormValues] = useState(initialFormValues) 
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

    const onSubmit = (event) => {
        event.preventDefault()
        postNewUser(finalForm);
        history.push("/")
    }
    
    const inputChange = (name, value) => {
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Sign Up</h2>
          <div>
            <label>
              First Name
              <input
                type="text"
                onChange={onChange}
                placeholder="John"
                name="fname"
                value={formValues.fname}
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                onChange={onChange}
                placeholder="Doe"
                name="lname"
                value={formValues.lname}
              />
            </label>
            <label>
              Username
              <input
                type="text"
                onChange={onChange}
                name="username"
                value={formValues.username}
              />
            </label>
            <label>
              Email
              <input
                type="text"
                onChange={onChange}
                placeholder="abc123@abc.com"
                name="email"
                value={formValues.email}
              />
            </label>
            <label>
              Password
              <input
                type="password"   // this needs to be password type
                onChange={onChange}
                name="password"
                value={formValues.password}
              />
            </label>
            <h3>Account Role</h3>
            <label>
              <select name="userrole" value={formValues.userrole} onChange={onChange}>
                <option value="none">----Select----</option>
                <option value={1}>OWNER</option>
                <option value={2}>RENTER</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <button disabled={false}>Sign Up</button>
        </div>
      </form>
      <div>
        <button onClick={clickBack}>Back</button>
      </div>
    </div>
  );
}

export default SignUp;