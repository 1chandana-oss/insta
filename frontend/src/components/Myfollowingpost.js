import React, { useEffect, useState } from 'react'
import './Home.css';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Myfollowingpost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [comment, setComment] = useState(" ")
  const [show,setShow] =useState(false);
  const [item, setItem] = useState(null)
  const [posts, setPosts] = useState()
  const notifya=(msg)=>toast.error(msg)
  const notifyb=(msg)=>toast.success(msg)

  //togglecomment
  
  const toggleComment=(posts)=>{
    if(show){
      setShow(false);
     
    }else{
      setShow(true);
      setItem(posts)
     
    }
  }



  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup")
    }
  
  
    //  fetching all post
    fetch("/myfollowingpost", {
      header: {
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },

    }).then(res => res.json())
    .then((result)=>{
      console.log(result)
      setData(result)
    })
      .catch(err => console.log(err))
  }, [])

  const likepost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newdata = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newdata)
        console.log(result)
      })
  }

  const unlikepost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newdata = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newdata)
        console.log(result)
      })
  }

  const makeComment = (text, id) => {
    // console.log(comment)
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
        text: text,
      })
    }).then(res => res.json())
      .then((result) => {
         const newdata = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newdata)
        setComment(" ")
        notifyb("suuccesfully commented")
        console.log(result)
      })
  }
  return (
    <div className="home">
      {data.map((posts) => {
        // console.log(posts)
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-pic">
                <img src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg " alt=" " />
                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                  </Link>
                  </h5>
              </div>
            </div>
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>
            {
              posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                ? (
                  <span className="material-symbols-outlined material-symbols-outlined -red" onClick={() => { unlikepost(posts._id) }}>
                    favorite
                  </span>
                ) : (<span className="material-symbols-outlined" onClick={() => { likepost(posts._id) }}>
                  favorite
                </span>)
            }
            <div className="card-content">
              <p > {posts.likes.length} likes</p>
              <p>{posts.body}</p>
            </div>

            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className="comment" onClick={() => { makeComment(comment, posts._id) }}>Post</button>
            </div>
          </div>
        )
})}

      {show && (
        <div className="showcomment">
        <div className="container">
          <div className="postpic">
            <img src="" alt="" />
          </div>
          <div className="details">

            {/* card-header */}
            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
              <div className="card-pic">
                <img src={item.photo} alt=" " />
                <h5>{item.postedBy.name}</h5>
              </div>
            </div>

            {/* comment-section */}
            <div className="commentsection" style={{ borderBottom: "1px solid #00000029" }} >
              {
                item.comments.map((comment)=>{
                return  (<p className='comm'>
                <span className="commenter" style={{ fontWeight: "bolder" }} >{comment.postedBy.name}{" "}  </span>
                <span className="commenttext">{comment.comment}</span>
              </p>)
                })
              }
              
            </div>

            {/* card content */}
            <div className="card-content">
              <p >{posts.likes.length} likes</p>
              <p>{posts.body}</p>
              <p style={{fontWeight:"bold",cursor:"pointer"}}
              onClick={()=>{
                toggleComment(posts);
              }}>
                View all comments
              </p>
            </div>
            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>
              <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className="comment"
               onClick={()=>{makeComment(comment,item._id)
                toggleComment();
               }}
              >Post</button>
            </div>
          </div>
        </div>
        <div className="closecomment" onClick={()=>{toggleComment(posts)}}>
          <span className="material-symbols-outlined material-symbols-outlined-comment">
            close
          </span>
        </div>
      </div>
      )}
    </div>
  )
}


export default Myfollowingpost
