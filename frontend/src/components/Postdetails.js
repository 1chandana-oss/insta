import React from 'react'
import "./Postdetails.css"
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const Postdetails = ({ item, toggleDetails }) => {
    const navigate=useNavigate()
    const notifya=(msg)=>toast.error(msg)
    const notifyb=(msg)=>toast.success(msg)
    const removePost = (postId) => {
        if(window.confirm("Do you really want to delete this post?")){
            fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        })
        .then((res)=>res.json())
        .then((result)=>{ 
            console.log(result);
            toggleDetails();
            navigate("/");
            notifyb(result.message)
        })
        }
    }
    return (
        <div className="showcomment">
            <div className="container">
                <div className="postpic">
                    <img src={item.photo} alt="post" />
                </div>
                <div className="details">

                    {/* card-header */}
                    <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                        <div className="card-pic">
                            <img src={item.photo} alt=" " />
                            <h5>{item.postedBy.name}</h5>
                            <div className="deletepost" onClick={()=>{removePost(item._id)}} >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* comment-section */}
                    <div className="commentsection" style={{ borderBottom: "1px solid #00000029" }} >
                        {
                            item.comments.map((comment) => {
                                return (<p className='comm'>
                                    <span className="commenter" style={{ fontWeight: "bolder" }} >{comment.postedBy.name}{" "}  </span>
                                    <span className="commenttext">{comment.comment}</span>
                                </p>)
                            })
                        }

                    </div>

                    {/* card content */}
                    <div className="card-content">
                        <p >{item.likes.length} likes</p>
                        <p>{item.body}</p>
                        <p style={{ fontWeight: "bold", cursor: "pointer" }}
                            // onClick={() => {
                            //     toggleComment(item);
                            // }}
                            >
                            View all comments
                        </p>
                    </div>
                    <div className="add-comment">
                        <span className="material-symbols-outlined">
                            mood
                        </span>
                        <input type="text" placeholder='Add a Comment' ///value={comment} onChange={(e) => { setComment(e.target.value) }}
                        />
                        <button className="comment"
                        //    onClick={()=>{makeComment(comment,item._id)
                        //     toggleComment();
                        //    }}
                        >Post</button>
                    </div>
                </div>
            </div>
            <div className="closecomment"
                onClick={() => { toggleDetails() }}
            >
                <span className="material-symbols-outlined material-symbols-outlined-comment">
                    close
                </span>
            </div>
        </div>
    )
}

export default Postdetails
