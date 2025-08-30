import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css";
import { useNavigate } from 'react-router-dom';
const Modal = ({setModalopen}) => {
    const navigate=useNavigate()
  return (
    <div className="darkBg" onClick={()=>setModalopen(false)}>
    <div className="centered">
    <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modalheader">
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className="closebtn" onClick={()=>setModalopen(false)}></button>
     <RiCloseLine/>
     <div className="modalcontent">
        are you really want to logout
     </div>
     <div className="modalactions">
        <div className="actionscontainer">
            <button className="logoutbtn" onClick={()=>{
                setModalopen(false);
                localStorage.clear()
                navigate("/signin")
            }}>logout</button>
            <button className="cancelbtn" onClick={()=>setModalopen(false)}>cancel</button>
        </div>
     </div>
        {/* </button> */}
    </div>
    </div>
    </div>
  )
}

export default Modal
