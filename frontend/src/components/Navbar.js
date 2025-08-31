import React, { useContext } from 'react'
import logo from '../img/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ login }) => {
  const navigate = useNavigate()
  const { setModalopen } = useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return [
        <>
          <Link to="/profile"><li>Profile</li></Link>
          <Link to="/createpost"><li>Create post</li></Link>

          <Link style={{ marginLeft: "20px" }} to="/followingpost">my following
          </Link>
          {/* <Link to={" "}> </Link>*/}
          <button className="primarybtn" onClick={() => {
            setModalopen(true);
            localStorage.clear();
            navigate("/signin");
          }}
          >LogOut</button>
        </>

      ]
    }
    else {
      return [
        <>
          <Link to="/signup"><li>SignUp</li></Link>
          <Link to="/signin"><li>SignIn</li></Link>
        </>
      ]

    }
  }

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return [
        <>
          <Link to="/"><li><span class="material-symbols-outlined">
            home
          </span></li></Link>
          <Link to="/profile"><li><span class="material-symbols-outlined">
            person
          </span></li></Link>
          <Link to="/createpost"><li><span class="material-symbols-outlined">
            add_box
          </span></li></Link>

          <Link style={{ marginLeft: "20px" }} to="/followingpost"><li><span class="material-symbols-outlined">
            explore
          </span></li>
          </Link>
          {/* <Link to={" "}> </Link>*/}
          <li onClick={() => {
            setModalopen(true);
            localStorage.clear();
            navigate("/signin");
          }}
          ><span class="material-symbols-outlined">
              logout
            </span></li>
        </>

      ]
    }
    else {
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
      <img className='img' id='insta-logo' src={logo} alt="" onClick={() => {
        navigate("/")
      }} />
      <ul className="nav-menu">
        {loginStatus()}
      </ul>
      <ul className="nav-moblile">
        {loginStatusMobile()}
      </ul>
    </div>
  )
}

export default Navbar
