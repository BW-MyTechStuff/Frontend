import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const formReset = {
    userrole:{
        userroleid: 1,
        userroletype: ""
    },
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
  }
  
const initialDisabled = true;

function SignUp() {
    const [formValues, setFormValues] = useState(formReset) 
    const [disabled, setDisabled] = useState(initialDisabled);
    const history = useHistory();

    
    
      const postNewUser = (userInfo) => {
        axiosWithAuth()
          .post("/users/user", userInfo)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(formValues)
        // postNewUser(formValues);
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
                type="text"
                onChange={onChange}
                name="password"
                value={formValues.password}
              />
            </label>
            <h3>Account Role</h3>
            <label>
              <select
                onChange={onChange}
              >
                <option value="none">- Select -</option>
                <option value={formValues.userrole.userroletype} name="userrole.userroletype">OWNER</option>
                <option value={formValues.userrole.userroletype}>RENTER</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <button disabled={null}>Sign Up</button>
        </div>
      </form>
      <div>
        <button onClick={clickBack}>Back</button>
      </div>
    </div>
  );
}

export default SignUp;