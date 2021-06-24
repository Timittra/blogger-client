import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Admin from "./components/Admin/Admin";
import BlogDetail from './components/BlogDetail/BlogDetail';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const UserContext = createContext();

function App() {
  let [loggedInUser, setLoggedInUser] = useState({
    isSignedIn : false,
    email: '',
    password: ''
  });

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/admin">
            <Admin/>
          </PrivateRoute>
          <Route path="/blogDetail/:id">
            <BlogDetail/>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
        <Footer />
      </Router>
      </UserContext.Provider>
  );
}

export default App;
