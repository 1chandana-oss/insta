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
          <li key="profile"><Link  to="/profile">Profile</Link></li>
          <li key="createpost"><Link  to="/createpost">Create post</Link></li>

          <li key="following" style={{ marginLeft: "20px" }}><Link  to="/followingpost">my following</Link>
          </li>
          {/* <Link to={" "}> </Link>*/}
          <button key="logout" className="primarybtn" onClick={() => {
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
          <li key="sugnup"><Link to="/signup">SignUp</Link></li>
          <li key="signin"><Link to="/signin">SignIn</Link></li>
        </>
      ]

    }
  }

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return (
        <>
          <li key="homee" ><Link to="/"><span className="material-symbols-outlined">
            home
          </span></Link></li>
          <li key="profilee" ><Link to="/profile"><span className="material-symbols-outlined">
            person
          </span></Link></li>
          <li key="createposts"><Link to="/createpost"><span className="material-symbols-outlined">
            add_box
          </span></Link></li>

          <Link style={{ marginLeft: "20px" }} to="/followingpost"><li><span className="material-symbols-outlined">
            explore
          </span></li>
          </Link>
          {/* <Link to={" "}> </Link>*/}
          <li onClick={() => {
            setModalopen(true);
            localStorage.clear();
            navigate("/signin");
          }}
          ><span className="material-symbols-outlined">
              logout
            </span></li>
        </>

        )
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
