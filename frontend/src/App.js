import logo from './logo.svg';
import React,{createContext,useState} from "react";
import './App.css';
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import Signin from './components/Signin.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import Createpost from './components/Createpost.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/LoginContext.js';
import Modal from './components/Modal.js'
import Userprofile from './components/Userprofile.js';
import Myfollowingpost from './components/Myfollowingpost.js';
function App() {
  const [userlogin, setUserlogin] = useState(false)
 const [modalopen, setModalopen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserlogin,setModalopen}}>
      <Navbar login={userlogin}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/createpost" element={<Createpost/>}></Route>
        <Route path="/profile/:userid" element={<Userprofile/>}></Route>
        <Route exact path="/followingpost" element={<Myfollowingpost/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
      {modalopen && <Modal setModalopen={setModalopen}></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
