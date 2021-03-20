import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import firebaseConfig from '../firebaseConfig';
import './Login.css'


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
const Login = () => {
  const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
  const [user, setUser] = useState(true);
  const [newUser, setNewUser] = useState({})
  const [oldUser, setOldUser] = useState({})
  const history = useHistory()
  const location = useLocation()
  let {from} = location.state || { from: {pathname: '/' } };
  const HandleCreatUser = (e) =>{
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((res) => {
        if(res){
            const signUpSuccess = {...newUser}
            signUpSuccess.successs = "User created successfully";
            signUpSuccess.failed = ""
            setNewUser(signUpSuccess)
            
         }
    })
    .catch((error) => {
      const signUpFailed = {...newUser}
      signUpFailed.failed = error.message
      signUpFailed.successs = "";
      setNewUser(signUpFailed)
   
    });
   
  }




  const handleOnBlur = (e)=>{
    const pass1 = document.getElementById('pass1').value
    const pass2 = document.getElementById('pass2').value
    let isFormValid;
    if(e.target.name === "name"){
        isFormValid = e.target.value.length > 5
    }
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6; 
      const passHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPassValid && passHasNumber;
    }
    if(e.target.name === 'password1' && pass1===pass2){
      isFormValid = true; 
    }
  
    if (isFormValid) {
      const newUserInfo = { ...newUser };
      newUserInfo[e.target.name] = e.target.value;
      
      setNewUser(newUserInfo);
    }
  }

  const googleSignInHandler = () => {
    const googlProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googlProvider)
      .then((res) => {
        setLoggedInUser(res.user)
        history.replace(from) 
      })
      .catch((error) => {
        alert(error.message)
        // ...
      });
  };

  const githubSignInHandler = () =>{
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((res) => {
    setLoggedInUser(res.user)
    history.replace(from) 
  }).catch((error) => {

  });
    
  }


 const  handleSignInWithEmail = (e)=>{
     const newUse = {...oldUser}
    e.preventDefault();
        firebase
          .auth()
          .signInWithEmailAndPassword(oldUser.email, oldUser.password)
          .then((res) => {
           
          })
          .catch((error) => {

          });
 }
    return (
<div className="container-fluid">
      <div className="container py-4">
        <div className="form d-flex justify-content-center">
          <div className="form">
            {user ? (
              <div className="card">
                <h3 className="py-4 px-5">Log In</h3>
                <div className="card-body">
                  <form action=""  className="p-3" onSubmit={handleSignInWithEmail}>
                    <div className="form-group">
                      <input onBlur={(e)=> setOldUser(e.target.name = e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="email"
                        name="email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input onBlur={(e)=> setOldUser(e.target.name = e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      className="form-control bg-danger text-light"
                      value="Login"
                    />
                    <p className="text-center mt-1">
                      <small>Don't have an account?</small>
                      <Link to="#"
                        onClick={() => setUser(false)}
                        className="link text-danger"
                      >
                        Create an account
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div className="card">
                <h3 className="py-4 px-5">Create account</h3>
                <div className="card-body">
                  <form action="" onSubmit={HandleCreatUser} className="p-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        onBlur={handleOnBlur}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        name="email"
                        onBlur={handleOnBlur}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        id="pass1"
                        onBlur={handleOnBlur}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="confirm password"
                        name="password1"
                        id="pass2"
                        onBlur={handleOnBlur}
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      className="form-control bg-danger text-light"
                      value="Create account "
                    />
                    <p className="text-center mt-1">
                      <small>Already have an account?</small>
                      <Link to="#"
                        onClick={() => setUser(true)}
                        className="link text-danger"
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-center mt-2">
              <hr />
              <p>OR</p>
              <hr />
            </div>
            <div className="socil-link d-flex flex-column justify-content-center">
              <Link to="#"
                onClick={googleSignInHandler}
                className="p-1 pb-2 border link rounded-pill mx-auto"
              >
                <i className="fab fa-google mr-5"></i>
                <span className="ml-5 ">Continue with google</span>
              </Link>
              <Link to="#"
                onClick={githubSignInHandler}
                className="p-1 pb-2 border link rounded-pill mx-auto mt-3"
              >
                <i className="fab fa-github mr-5"></i>
                <span className="ml-5 ">Continue with github</span>
              </Link>
            </div>
            <p className="text-center mt-3 text-success">{newUser.success}</p>
            <p className="text-center mt-3 text-danger">{newUser.failed}</p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;