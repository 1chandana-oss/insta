import React,{useState,useEffect} from 'react'
import './Profile.css';
import Postdetails from './Postdetails';
import Profilepic from './Profilepic';
const Profile = () => {
  var profileLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
  const [pic, setPic] = useState([])
  const [show,setShow]=useState(false)
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(" ")
 const [changepic, setChangepic] = useState(false)

  const toggleDetails=(posts)=>{
    if(show){
      setShow(false);
     
    }else{
      setShow(true);
      setPosts(posts)
     
    }
  };
  const changeprofile=()=>{
    if(changepic){
      setChangepic(false)
    }else{
      setChangepic(true)
    }
  }
  useEffect(() => {
  
    fetch(`/user/${JSON.parse(localStorage.getItem
          ("user"))._id}`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      console.log(result)
      setPic(result.post)
      setUser(result.user)
      console.log(pic)
    })
  }, [])
  
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic" onClick={changeprofile}> 
          <img src={user.photo ? user.photo : profileLink} alt =" "/>
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem
          ("user")).name}</h1>
          <div className="profile-info" style={{display:"flex"}}>
            <p>{pic? pic.length:"0"} posts</p>
            <p>{user.followers?user.followers.length:"0"} followers</p>
            <p>{user.following?user.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",margin:"25px auto",opacity:"0.8"}}/>
      <div className="gallery">
        {pic.map((pics)=>{
            return <img key={pics._id} src={pics.photo} onClick={()=>{toggleDetails(pics)
            }} className='item'></img>
        })}
        
        {/* <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" /> */}
      </div>
      {show && 
      <Postdetails item={posts} toggleDetails={toggleDetails}/>
      }
      {
        changepic &&
        <Profilepic changeprofile={changeprofile}/>
      }
      
    </div>
  )
}

export default Profile
