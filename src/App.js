import logo from './logo.svg';
import './App.css';
import React, {useState} from "react"
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddNewItem from "./components/AddNewItem";
import EditItem from "./components/EditItem";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path='/login' render={(props) => {
                return <Login {...props} setIsLoggedIn={setIsLoggedIn} />
              }} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/user-dashboard" component={UserDashboard} logout={logout} />
      <PrivateRoute path="/add-new-item" component={AddNewItem} />
      <PrivateRoute path="/edit-item" component={EditItem} />
    </div>
  );
}

export default App;
