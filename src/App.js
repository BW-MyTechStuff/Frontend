import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddNewItem from "./components/AddNewItem";
import EditItem from "./components/EditItem";
import axios from 'axios';

const formReset = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  account_role: ''
}

const initialDisabled = true;

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(formReset) 
  const [disabled, setDisabled] = useState(initialDisabled);
  
  const postNewUser = newUser => {
    axios.post('https://usemytechstuff-tt26.herokuapp.com/users/user', newUser)
    .then(res => {
      setUsers([res.data, ...users]);
      console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    })
    setFormValues(formReset);
    console.log(users)
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      account_role: formValues.account_role.trim() 
    }
    postNewUser(newUser)
  }
  const onSubmit = (event) => {
    event.preventDefault();
    formSubmit();
  }

const inputChange = (name, value) => {
  setFormValues({...formValues, [name]: value})
  
}
  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    inputChange(name, valueToUse);
  }
  return (
    <div className="App">
      <h1>Use My Tech Stuff</h1>
      <Route exact path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} >
        <SignUp 
        values={formValues} 
        change={onChange} 
        submit={onSubmit} 
        disabled={disabled}
      />
     </Route>
      <PrivateRoute path="/add-new-item" component={AddNewItem} />
      <PrivateRoute path="/edit-item" component={EditItem} />
    </div>
  );
}

export default App;
