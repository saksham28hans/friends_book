import { MoreVert } from '@material-ui/icons';
import {React, useState,useEffect, useContext} from 'react';
import axios from 'axios'
import './post.css'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
// import { Users } from '../../dummyData';

const Post = (props) => {
  const post = props.post

  // const user = Users.filter((us)=>{return us.id === post.userId})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [like, setlike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext)
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

  useEffect(() => {
   setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id,post.likes]);
  useEffect(() => {
    const fetchUser = async()=>{
       const res = await axiosInstance.get(`users?userId=${post.userId}`)

       setUser(res.data)
    }
    fetchUser()
}, [post.userId]);  
  const likehandler = async()=>{
    try {
      const res= axiosInstance.put('posts/'+post._id+'/like',{userId:currentUser._id})
      
    } catch (error) {   
      console.log(error);
    }
    setlike(isLiked ? like-1: like+1);
    setisLiked(!isLiked)
  }
  return (
    <div className='post'>
     <div className="postWrapper">
         <div className="postTop">
            <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture ? user.profilePicture : PF+'person/noAvatar.png'} alt="" className="postProfileImg" />
            </Link>
              <span className="postUserName">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
             <MoreVert />
            </div>
         </div>
         <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img src={post.img} alt="" className="postImg" />
         </div>
         <div className="postBottom">
            <div className="postBottomLeft">
                <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likehandler} />
                <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likehandler} />
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
         </div>
     </div>
    </div>
  );
}

export default Post;
