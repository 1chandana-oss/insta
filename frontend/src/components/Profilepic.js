import React,{useState,useEffect,useRef} from 'react'
import Postdetails from './Postdetails'

const Profilepic = ({changeprofile}) => {
    var picLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
    const hiddenFileInput=useRef(null)
    const [url, setUrl] = useState(null)
    const [ image, setImage] = useState("")
    const handleclick=()=>{
       hiddenFileInput.current.click()
    }
    const postDetails = ()=>{
    const data=new FormData();
    data.append("file",image)
    data.append("upload_preset","INSTA_CLONE")
    data.append("cloud_name","cloudchandana")
    fetch("https://api.cloudinary.com/v1_1/cloudchandana/image/upload",{
      method:"post",
      body:data
    }).then( res => res.json())
    .then(data=>setUrl(data.url))
    .catch(err=>console.log(err))
    console.log(url)
  }


  const postpic=()=>{
    fetch("/uploadprofilepic",
      {
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          pic:url
        })
  }).then(res=>res.json())
  .then(data=>{
     console.log(data)
     changeprofile();
     window.location.reload()
  })
  .catch(err=> console.log(err))
  }

  useEffect(() => {
    if(image){
     postDetails()
    }
  
  }, [image]);

  useEffect(()=>{
    if(url){
        postpic();
    }
  },[url]);
  
  return (
    <div className="profilepic darkBg">
      <div className="changepic centered">
        <div>
            <h2>
            change profile photo
            </h2>
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button className="upload-btn" style={{color:"#1EA1F7"}} onClick={handleclick}>Upload Photo</button>
            <input type="file" ref={hiddenFileInput} accept='image/*' style={{display:"none"}} onChange={(e)=>{setImage
                (e.target.files[0])
            }} />
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button className="upload-btn" onClick={()=>{
                setUrl(null);
                postpic();
            }} style={{color:"#ED4956"}}>Remove Current Photo</button>
        </div>
        <div style={{borderTop:"1px solid #00000030"}}>
            <button style={{background:"none",cursor:"pointer",border:"none",fontSize:"15px"}} onClick={changeprofile}>Cancle</button>
        </div>
      </div>
    </div>
  )
}

export default Profilepic
