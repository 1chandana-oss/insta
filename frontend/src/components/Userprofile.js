import React,{useState,useEffect, useId} from 'react'
import './Profile.css';
import Postdetails from './Postdetails';
import { useParams } from 'react-router-dom';
const Userprofile = () => {
  var profileLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
  const {userid}=useParams()
  const [user, setUser] = useState(" ")
  const [show,setShow]=useState(false)
  const [posts, setPosts] = useState([])
  const [isfollow, setIsfollow] = useState(false)
  const followuser=(userid)=>{
    fetch("/follow",{
        method:"put",
        headers:{
        "content-type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userid
      })

    })
    .then((res)=>{res.json()})
    .then((data)=>{
        console.log(data);
        setIsfollow(true);
    })
  }

  const unfollowuser=(userid)=>{
    fetch("http:localhost://5000/unfollow",{
        method:"put",
        headers:{
        "content-type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userid
      })

    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        setIsfollow(false)
    })
  }

  useEffect(() => {
  
    fetch(`http://localhost:5000/user/${userid}`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      setUser(result.user)
      setPosts(result.post)
      if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)
    ){
        setIsfollow(true)
      }
    })
  }, [isfollow])
  
  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic"> 
          <img src={user.photo ? user.photo : profileLink} alt =" "/>
        </div>
        <div className="profile-data">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h1>{user.name}</h1>
          <button className='followbtn' onClick={()=>{
            if(isfollow){
            unfollowuser(user._id);
            }
            else{
                followuser(user._id)
            }
          }}>{isfollow ? "Unfollow":"Follow"}</button>
          </div>
          <div className="profile-info" style={{display:"flex"}}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length :"0"} followers</p>
            <p>{user.following ? user.following.length:"0"} folllowing</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",margin:"25px auto",opacity:"0.8"}}/>
      <div className="gallery">
        {posts.map((pics)=>{
             return <img key={pics._id} src={pics.photo}
            //  onClick={()=>{toggleDetails(pics)
            // }}
             className='item'></img>
        })}
        
        {/* <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
        <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" /> */}
      </div>
      {/* {show && 
      <Postdetails item={posts} toggleDetails={toggleDetails}/>
      } */}
      
    </div>
  )
}

export default Userprofile
