// import React ,{useState,useContext} from 'react'
// import logo from '../img/logo.png'
// import './Signin.css'
// import {  toast } from 'react-toastify';
// import { Link ,useNavigate} from 'react-router-dom'
// import { LoginContext } from '../context/LoginContext';


// console.log("From .env:", process.env.REACT_APP_API_URL);
// const    Signin = () => {
//     const {setUserlogin}=useContext(LoginContext)
//     const navigate=useNavigate();
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const notifya=(msg)=>toast.error(msg)
//     const notifyb=(msg)=>toast.success(msg)
//     const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//     const postdata = ()=>{
//         if(!emailregex.test(email)){
//             notifya("invalid email")
//             return
            
//         }
//         console.log("API URL:", process.env.REACT_APP_API_URL);

//         fetch(`${process.env.REACT_APP_API_URL}/auth/signin`,{
//            method:"POST",
//            headers:{
//             "Content-Type":"application/json"
//            },
//            body:JSON.stringify({ 
//             email:email,
//             password:password
//            }),
//         }).then(res=>res.json())
//         .then(data=>{
//             if(data.error){
//             notifya(data.error)
//             }else{
//                 notifyb("Signed in successfully")
//                 console.log(data)
//                 localStorage.setItem("jwt",data.token)
//                 localStorage.setItem("user",JSON.stringify(data.user))
//                 setUserlogin(true)
//                 navigate('/')
//             }
//             console.log(data)
//         }).catch(err=>{
//             notifya("something went wrong")
//             console.error(err)
//         })
//         } 
//   return (
//     <div className="signin">
//         <div>
//             <div className="loginform">
//                 <img className="signuplogo" src={logo} alt="" />
            
//             <div>
//                 <input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
//             </div>
//             <div>
//                 <input type="password" name="password" id="password" value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
//             </div>
//             <input type="submit" id="login-btn" onClick={()=>{postdata()}} value="Sign In" />
//             </div>
//             <div className="loginform2">
//                 Don't have an account ?
//                 <Link to ="/signup">
//                 <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
//                 </Link>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Signin



import React, { useState, useContext } from 'react';
import logo from '../img/logo.png';
import './Signin.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Signin = () => {
  const { setUserlogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notifya = (msg) => toast.error(msg);
  const notifyb = (msg) => toast.success(msg);

  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const postdata = async () => {
    if (!emailregex.test(email)) {
      notifya('Invalid email');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        notifya(errorData.error || 'Login failed');
        return;
      }

      const data = await res.json();
      notifyb('Signed in successfully');

      // Save token and user in localStorage
      localStorage.setItem('jwt', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUserlogin(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      notifya('Something went wrong');
    }
  };

  return (
    <div className="signin">
      <div>
        <div className="loginform">
          <img className="signuplogo" src={logo} alt="logo" />
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" id="login-btn" onClick={postdata} value="Sign In" />
        </div>

        <div className="loginform2">
          Don't have an account?{' '}
          <Link to="/signup">
            <span style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
