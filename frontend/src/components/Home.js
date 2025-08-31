// import React, { useEffect, useState } from 'react'
// import './Home.css';
// import {  toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// const Home = () => {
//   var profileLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [comment, setComment] = useState(" ")
//   const [show,setShow] =useState(false);
//   const [item, setItem] = useState([])
//   const [posts, setPosts] = useState()
//   const notifya=(msg)=>toast.error(msg)
//   const notifyb=(msg)=>toast.success(msg)


//   const toggleComment=(posts)=>{
//     if(show){
//       setShow(false);
     
//     }else{
//       setShow(true);
//       setItem(posts)
     
//     }
//   }
//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       navigate("/signup")
//     }
  
//     //  fetching all post
//     fetch(`${process.env.REACT_APP_API_URL}/posts/allposts`, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },

//     }).then(res => res.json())
//     .then((result)=>{
//       console.log("API Response:", data);
//       console.log(result)
//       setData(data)
//     })
//       .catch(err => console.log(err))
//   }, [])

//   const likepost = (id) => {
//     fetch(`${process.env.REACT_APP_API_URL}/posts/like/${id}`, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         postId: id
//       })
//     }).then(res => res.json())
//       .then((result) => {
//         const newdata = data.map((posts) => {
//           if (posts._id == result._id) {
//             return result
//           } else {
//             return posts
//           }
//         })
//         setData(newdata)
//         console.log(result)
//       })
//   }

//   const unlikepost = (id) => {
//     fetch(`${process.env.REACT_APP_API_URL}/posts/unlike/${id}`, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         postId: id
//       })
//     }).then(res => res.json())
//       .then((result) => {
//         const newdata = data.map((posts) => {
//           if (posts._id == result._id) {
//             return result
//           } else {
//             return posts
//           }
//         })
//         setData(newdata)
//         console.log(result)
//       })
//   }

//   const makeComment = (text, id) => {
//     // console.log(comment)
//     fetch(`${process.env.REACT_APP_API_URL}/posts/comment/${id}`, {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         postId: id,
//         text: text,
//       })
//     }).then(res => res.json())
//       .then((result) => {
//          const newdata = data.map((posts) => {
//           if (posts._id == result._id) {
//             return result
//           } else {
//             return posts
//           }
//         })
//         setData(newdata)
//         setComment(" ")
//         notifyb("suuccesfully commented")
//         console.log(result)
//       })
//   }
//   return (
//     <div className="home">
//       {data.map((posts) => {
//         // console.log(posts)
//         return (
//           <div className="card">
//             <div className="card-header">
//               <div className="card-pic">
//                 <img src={posts.photo ?posts.postedBy.photo:"profileLink"} alt=" " />
//                 <h5>
//                   <Link to={`/profile/${posts.postedBy._id}`}>
//                   {posts.postedBy.name}
//                   </Link>
//                   </h5>
//               </div>
//             </div>
//             <div className="card-image">
//               <img src={posts.photo} alt="" />
//             </div>
//             {
//               posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
//                 ? (
//                   <span className="material-symbols-outlined material-symbols-outlined -red" onClick={() => { unlikepost(posts._id) }}>
//                     favorite
//                   </span>
//                 ) : (<span className="material-symbols-outlined" onClick={() => { likepost(posts._id) }}>
//                   favorite
//                 </span>)
//             }
//             <div className="card-content">
//               <p > {item.likes.length} like</p>
//               <p>{posts.body}</p>
//             </div>

//             <div className="add-comment">
//               <span className="material-symbols-outlined">
//                 mood
//               </span>
//               <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
//               <button className="comment" onClick={() => { makeComment(comment, posts._id) }}>Post</button>
//             </div>
//           </div>
//         )
// })}

//       {show && (
//         <div className="showcomment">
//         <div className="container">
//           <div className="postpic">
//             <img src="" alt="" />
//           </div>
//           <div className="details">

//             {/* card-header */}
//             <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
//               <div className="card-pic">
//                 <img src={item.photo} alt=" " />
//                 <h5>{item.postedBy.name}</h5>
//               </div>
//             </div>

//             {/* comment-section */}
//             <div className="commentsection" style={{ borderBottom: "1px solid #00000029" }} >
//               {
//                 item.comments.map((comment)=>{
//                 return  (<p className='comm'>
//                 <span className="commenter" style={{ fontWeight: "bolder" }} >{comment.postedBy}{" "}  </span>
//                 <span className="commenttext">{comment.comment}</span>
//               </p>)
//                 })
//               }
              
//             </div>

//             {/* card content */}
//             <div className="card-content">
//               <p >{posts.likes.length} likes</p>
//               <p>{posts.body}</p>
//               <p style={{fontWeight:"bold",cyrsor:"pointer"}}
//               onClick={()=>{
//                 toggleComment(posts);
//               }}>
//                 View all comments
//               </p>
//             </div>
//             <div className="add-comment">
//               <span className="material-symbols-outlined">
//                 mood
//               </span>
//               <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
//               <button className="comment"
//                onClick={()=>{makeComment(comment,item._id)
//                 toggleComment();
//                }}
//               >Post</button>
//             </div>
//           </div>
//         </div>
//         <div className="closecomment" onClick={()=>{toggleComment(posts)}}>
//           <span className="material-symbols-outlined material-symbols-outlined-comment">
//             close
//           </span>
//         </div>
//       </div>
//       )}
//     </div>
//   )
// }


// export default Home


import React, { useEffect, useState } from 'react';
import './Home.css';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);

  const notifya = (msg) => toast.error(msg);
  const notifyb = (msg) => toast.success(msg);

  const toggleComment = (post = null) => {
    if (show) {
      setShow(false);
      setItem(null);
    } else {
      setShow(true);
      setItem(post);
    }
  };

  // Fetch all posts
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchPosts = async () => {
      console.log("Token from localStorage:", token);

      try {
        const res = await fetch(`${API_URL}/posts/allposts`, {
          method:"GET",
          headers: {
            "Authorization": 'Bearer ' + token,
            "Content-type":"application/json"
          },
        });

        if (res.status === 401) {
          notifya('You must be logged in to see posts');
          navigate('/signin');
          return;
        }

        const result = await res.json();
        setData(result.posts || []);
        console.log('API Response:', result);
      } catch (err) {
        console.error(err);
        notifya('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const updatePostData = (updatedPost) => {
    const newData = data.map((p) => (p._id === updatedPost._id ? updatedPost : p));
    setData(newData);
    if (item && item._id === updatedPost._id) {
      setItem(updatedPost);
    }
  };

  const likePost = async (id) => {
    const token = localStorage.getItem('jwt');
    console.log("JWT Token:", localStorage.getItem("jwt"));
    try {
      const res = await fetch(`${API_URL}/posts/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ postId: id }),
      });
      const result = await res.json();
      updatePostData(result);
    } catch (err) {
      console.error(err);
      notifya('Failed to like post');
    }
  };

  const unlikePost = async (id) => {
    const token = localStorage.getItem('jwt');
    try {
      const res = await fetch(`${API_URL}/posts/unlike/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ postId: id }),
      });
      const result = await res.json();
      updatePostData(result);
    } catch (err) {
      console.error(err);
      notifya('Failed to unlike post');
    }
  };

  const makeComment = async (text, id) => {
    const token = localStorage.getItem('jwt');
    try {
      const res = await fetch(`${API_URL}/posts/comment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ postId: id, text }),
      });
      const result = await res.json();
      updatePostData(result);
      setComment('');
      notifyb('Comment added successfully');
    } catch (err) {
      console.error(err);
      notifya('Failed to add comment');
    }
  };

  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  return (
    <div className="home">
      {data.map((posts) => (
        <div className="card" key={posts._id}>
          <div className="card-header">
            <div className="card-pic">
              <img src={posts.postedBy.photo || 'https://cdn-icons-png.flaticon.com/128/64/64572.png'} alt="profile" />
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>{posts.postedBy.name}</Link>
              </h5>
            </div>
          </div>

          <div className="card-image">
            <img src={posts.photo} alt="" />
          </div>

          {posts.likes.includes(userId) ? (
            <span className="material-symbols-outlined material-symbols-outlined -red" onClick={() => unlikePost(posts._id)}>
              favorite
            </span>
          ) : (
            <span className="material-symbols-outlined" onClick={() => likePost(posts._id)}>
              favorite
            </span>
          )}

          <div className="card-content">
            <p>{posts.likes.length} likes</p>
            <p>{posts.body}</p>
          </div>

          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input type="text" placeholder="Add a Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="comment" onClick={() => makeComment(comment, posts._id)}>
              Post
            </button>
          </div>
        </div>
      ))}

      {show && item && (
        <div className="showcomment">
          <div className="container">
            <div className="postpic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              <div className="card-header" style={{ borderBottom: '1px solid #00000029' }}>
                <div className="card-pic">
                  <img src={item.postedBy.photo || 'https://cdn-icons-png.flaticon.com/128/64/64572.png'} alt="profile" />
                  <h5>{item.postedBy.name}</h5>
                </div>
              </div>

              <div className="commentsection" style={{ borderBottom: '1px solid #00000029' }}>
                {item.comments.map((comment, idx) => (
                  <p className="comm" key={idx}>
                    <span className="commenter" style={{ fontWeight: 'bolder' }}>
                      {comment.postedBy.name || comment.postedBy}{' '}
                    </span>
                    <span className="commenttext">{comment.comment}</span>
                  </p>
                ))}
              </div>

              <div className="card-content">
                <p>{item.likes.length} likes</p>
                <p>{item.body}</p>
                <p
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => {
                    toggleComment();
                  }}
                >
                  Close comments
                </p>
              </div>

              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input type="text" placeholder="Add a Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    setComment('');
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
