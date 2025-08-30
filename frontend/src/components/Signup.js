import React, {useEffect,useState} from 'react'
import logo from "../img/logo.png"
import './Signup.css'
import { Link,useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
const Signup = () => {
    const navigate  =useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    
    const notifya=(msg)=>toast.error(msg)
    const notifyb=(msg)=>toast.success(msg)
    const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    const postdata = ()=>{
        if(!emailregex.test(email)){
            notifya("invalid email")
            return
            
        }else if(!PasswordRegex.test(password)){
            notifya("try strong password")
            return 
        }
        fetch(`${API_URL}/auth/signup`,{
           method:"POST",
           headers:{
            "Content-Type":"application/json"
           },
           body:JSON.stringify({
            name:name,
            email:email,
            password:password,
            username:username
           })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
            notifya(data.error)
            }else{
                notifyb(data.message)
                navigate('/signin')
            }
            console.log(data)
        }).catch(err=>{
            notifya("something went wrong")
            console.log(err)    
            })
        }

  return  (
    <div className="signup">
        <div className="form-container">
            <div className="form">
            <img className="signuplogo" src={logo} alt="" />
            <p className="loginpara">
                sign up to see  your profile
            </p>
            <div>
                <input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <input type="text" name="name" id="name" value={name} placeholder='Fullname' onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                <input type="text" name="username" id="username" value={username} placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div>
                <input type="password" name="password" id="password" value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <p className="loginpara" style={{fontSize:"12px" ,margin:"3px 0px"}}>
                by signing up,you agree to our terms, <br/> privacy policy and cookies policy.
            </p>
            <input type="submit" id="submit-btn" value='Sign Up' onClick={()=>{postdata()}}/>
        </div>  
        <div className="form2">
            Already have an account ?
            <Link to="/signin"> <span style={{color:"blue",cursor:"pointer"}}>Sign In</span></Link>
        </div>
        </div>
    </div>
  );
}

export default Signup
