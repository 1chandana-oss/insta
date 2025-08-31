import React,{useState,useEffect} from 'react'
import './Createpost.css';
// import {  toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const Createpost = () => {
//   const [body, setBody] = useState(" ");
//   const [image, setImage] = useState(" ");
//  const [url, setUrl] = useState(" ");
//  const navigate=useNavigate()

//   const notifya=(msg)=>toast.error(msg)
//   const notifyb=(msg)=>toast.success(msg)
//  useEffect(()=>{
//   if(url){
//     fetch(`${API_URL}/posts/createpost`,
//       {
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":"Bearer "+localStorage.getItem("jwt")
//         },
//         body:JSON.stringify({
//           body,
//           pic:url
//         })
//   }).then(res=>res.json())
//   .then(data=>{if(data.error){
//     notifya(data.error)
//   }else{
//     notifyb("succesfully posted ")
//     navigate("/")
//   }
// })
//   .catch(err=> console.log(err))
//   }

//  },[url])
//   //posting image to cloudinary

//   const postDetails = ()=>{
//     console.log(body,image)
//     const data=new FormData();
//     data.append("file",image)
//     data.append("upload_preset","INSTA_CLONE")
//     data.append("cloud_name","cloudchandana")
//     fetch("https://api.cloudinary.com/v1_1/cloudchandana/image/upload",{
//       method:"post",
//       body:data
//     }).then( res => res.json())
//     .then(data=>setUrl(data.url))
//     .catch(err=>console.log(err))

//   //   fetch("http://localhost:5000/createpost",
//   //     {
//   //       method:"post",
//   //       header:{
//   //           "Content-Type":"application/json",
//   //           "Authorization":"Bearer"+localStorage.getItem("jwt")
//   //       },
//   //       body:JSON.stringify({
//   //         body,
//   //         pic:url
//   //       })
//   // }).then(res=>res.json())
//   // .then(data=>console.log(data))
//   // .catch(err=> console.log(err))
//   // }
//   }
//     const loadfile=(event)=>{ 
//     var output = document.getElementById('output');
//     output.src = URL.createObjectURL(event.target.files[0]);
//     output.onload = function() {
//       URL.revokeObjectURL(output.src) ;
//     }
// }
//   return (
//     <div className='createpost'>
//       <div className="post-header">
//         <h4 style={{margin:"3px auto"}}>create new post</h4>
//         <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
//       </div>
//       <div className="main-div">
//         <img id='output' src="data:image/png;base64,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"/>
//         <input type="file" accept="image/*" onChange={(event)=>{loadfile(event); setImage(event.target.files[0])}}/>
//       </div>
//       <div className="details">
//         <div className="card-header">
//             <div className="card-pic">
//                 <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="" />
//             </div>
//             <h5>minakshi</h5>
//         </div>
//         <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} type="text" placeholder='write a caption....' ></textarea>
//       </div>
//     </div>
//   )
// }

// export default Createpost

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const notifya = (msg) => toast.error(msg);
  const notifyb = (msg) => toast.success(msg);

  const postData = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      notifya('You must be logged in');
      navigate('/signin');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (photo) formData.append('photo', photo);

    try {
      const res = await fetch(`${API_URL}/posts/createpost`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        notifya(errorData.error || 'Failed to create post');
        return;
      }

      const result = await res.json();
      notifyb('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      notifya('Something went wrong');
    }
  };

  return (
    <div className="createpost">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={postData}>Create Post</button>
    </div>
  );
};

export default CreatePost;

