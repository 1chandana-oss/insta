import React,{useContext} from 'react'
import logo from '../img/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
const Navbar = ({login}) => {
  const navigate=useNavigate()
  const {setModalopen}= useContext(LoginContext)
  const loginStatus=()=>{
    const token = localStorage.getItem("jwt")
    if(login || token){
      return [
        <>
        <Link to="/profile"><li>Profile</li></Link>
      <Link to="/createpost"><li>Create post</li></Link>

      <Link style={{marginLeft:"20px"}} to="/followingpost">my following
      </Link>
      {/* <Link to={" "}> </Link>*/}
      <button className="primarybtn" onClick={()=>{setModalopen(true);
      localStorage.clear();
      navigate("/signin");
       }}
      >LogOut</button>
      </>

      ]
    }
    else{
      return [
      <>
      <Link to="/signup"><li>SignUp</li></Link>
      <Link to="/signin"><li>SignIn</li></Link>
      </>
    ]

    }
  }
  loginStatus();
  return (
    <div className='navbar'>
      <img className='img'  src={logo} alt="" onClick={()=>{
        navigate("/")
      }} />
      <ul className="nav-menu">
      {loginStatus()}
      </ul>
    </div>
  )
}

export default Navbar
