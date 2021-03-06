import './App.css';
import React, {useState} from "react"
import { Route, useHistory } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddNewItem from "./components/AddNewItem";
import EditItem from "./components/EditItem";
import BrowseListings from "./components/BrowseListings";
import PurchaseView from './components/RentView';
import SuccessPage from './components/SuccessPage';


function App() {

  const [, setIsLoggedIn] = useState(false)
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('token')
    history.push("/")
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
      <PrivateRoute path="/browse-listings" component={BrowseListings} />
      <PrivateRoute path="/item" component={PurchaseView} />
      <PrivateRoute path="/success-page" component={SuccessPage} />
    </div>
  );
}

export default App;
