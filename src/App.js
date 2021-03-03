import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddNewItem from "./components/AddNewItem";
import EditItem from "./components/EditItem";


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/add-new-item" component={AddNewItem} />
      <PrivateRoute path="/edit-item" component={EditItem} />
    </div>
  );
}

export default App;
