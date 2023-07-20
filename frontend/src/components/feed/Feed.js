import {React,useState,useEffect, useContext} from 'react';
import Post from '../post/Post';
import Share from '../Share/Share';
import './feed.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
// import {Posts} from '../../dummyData.js'
const Feed = (props) => {
  const username = props.username;
  const [posts, setposts] = useState([]);
  const {user} = useContext(AuthContext);
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

  useEffect(() => {
      const fetchPosts = async()=>{
        console.log(username);
        console.log(user.username);
         const res = username 
         ? await axiosInstance.get('posts/profile/'+username) 
         : await axiosInstance.get(`posts/timeline/${user._id}`)
         setposts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
         }))
      }
      fetchPosts()
  }, [username,user._id]);
  return (
    <div className='feed'>
       <div className="feedWrapper">
        {(!username || username=== user.username)  && <Share />}
        {posts.map((post)=>{
          return <Post  key = {post._id} post={post}/>
        })}
       </div>
    </div>
  );
}

export default Feed;
