/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../App';
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import {useForm} from "react-hook-form";
import './Login.css';

const Login = () => {
    let [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const { register, errors, watch } = useForm({});
    const password = useRef({});

    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app();
      }
         
      const handleBlur = (e) => {
        let isFieldValid = true;
    
        // if(e.target.name === 'email'){
        //   isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        // }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value;
          isFieldValid = isPasswordValid;
        }
        if(isFieldValid){
          const newUserInfo = {...loggedInUser}; 
          newUserInfo[e.target.name] = e.target.value;
          setLoggedInUser(newUserInfo);
        }
      }


  const handleSubmit = (e) => {
    if (loggedInUser.password==="#2021dev"){
      firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
      .then((res) => {
        const newUserInfo = {...loggedInUser}; 
        newUserInfo.error = '';
        newUserInfo.success = true; 
        newUserInfo.isSignedIn = true;
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = {...loggedInUser}; 
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setLoggedInUser(newUserInfo);
      });
    }

    if (!newUser && loggedInUser.email && loggedInUser.password) {
        firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
          .then((res) => {
            const newUserInfo = {...loggedInUser}; //
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            setLoggedInUser(newUserInfo);
            history.replace(from);
          })
          .catch((error) => {
            const newUserInfo = {...loggedInUser}; //
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setLoggedInUser(newUserInfo);
          });
    }

  e.preventDefault();
}

 return (
        <div className='login'>

            <form onSubmit={handleSubmit}>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" className='check-box'/>
            { newUser ? <label htmlFor="newUser">Already have an account? Log in</label> :
                <label htmlFor="newUser">Don't have an account? Create an account</label>}

                {newUser ? <h3>Create an account</h3> : <h3>Log in</h3>}
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='name' />}
                <br />

                <input type="text" name='email' onBlur={handleBlur} placeholder="Username or Email" required />
                <br />
                
                <input type="password" name="password" onBlur={handleBlur} placeholder='Password' 
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: "#2021dev",
                    message: "use default password!"
                  }
                })}
                 />
                <br />

                <input className='button-login' type="submit" value='Log in' />

            </form>
            {
               (loggedInUser.password === "#2021dev")? <p>Successfully logged in. </p> : <p>Use default password!</p>
            }
             <p style={{ color: 'red' }}>{loggedInUser.error}</p>
            {
                loggedInUser.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully.</p>
            }

        </div>
    );
};

export default Login;