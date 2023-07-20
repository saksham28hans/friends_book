import { React, useContext } from 'react';
import './login.css'
import { useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )

  }
  
  const handleregisterlogin = ()=>{
    navigate('/register')
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h4 className="loginLogo">FriendsBook</h4>
          <span className="loginDesc">Connect with Friends and the world around you on FriendsBook.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder='Email' className="loginInput" type="email" ref={email} />
            <input placeholder='Password' className="loginInput" type="password" ref={password} minLength='6' />
            <button className="loginButton" disabled={isFetching} type="submit">{isFetching ?
              <CircularProgress color='inherit' /> : 'Log In'}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleregisterlogin}>Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
