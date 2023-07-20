import React, { useRef } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confpassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(password.current.value);
    console.log(confpassword.current.value);
    if(password.current.value !== confpassword.current.value)
    {
      confpassword.current.setCustomValidity("Passwords don't match")
      confpassword.current.reportValidity();
    }
    else
    {
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value
      }

      try {
        const res = await axios.post("auth/register",user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleloginregister = ()=>{
      navigate('/login')
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
               <input placeholder='Username' ref={username} className="loginInput" />
               <input placeholder='Email' ref={email} type="email" className="loginInput" />
               <input placeholder='Password' ref={password} type="password" minLength="6" className="loginInput" />
               <input placeholder='Confirm Password' ref={confpassword} type="password" className="loginInput" />
               <button className="loginButton" type='submit'>Sign In</button>
               <button className="loginRegisterButton" onClick={handleloginregister}>Log Into Account</button>
           </form>
       </div>
    </div>
   </div>
  );
}

export default Register;
