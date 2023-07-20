import {React, useState, useEffect} from 'react';
import './chatOnline.css';
import axios from "axios";

const ChatOnline = ({onlineFriends, currentId, setcurrentChat }) => {
  const [friends, setfriends] = useState([]);
  const [friendsOnline, setfriendsOnline] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async(user)=>{
   try {
     const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
     if(!res.data)
     {
      const newConv = await axios.post(`/conversations`,{senderId:currentId,receiverId:user._id});
      setcurrentChat(newConv.data)
     }
     else
     setcurrentChat(res.data)
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(() => {
    const getFriends = async()=>{
      try {
        const res = await axios.get("/users/friends/"+currentId)
        setfriends(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getFriends()
  }, [currentId]);
 
  useEffect(() => {
    setfriendsOnline(friends.filter((friend)=>onlineFriends.includes(friend._id)));
  },[friends,onlineFriends]);
  return (
    <div className='chatOnline'>
    {friendsOnline.map((o)=>(
      <div className="chatOnlineFriend" key={o._id} onClick={()=>{handleClick(o)}}>
        <div className="chatOnlineImgContainer">
        <img src={o?.profilePicture ? o?.profilePicture : PF + 'person/noAvatar.png'} alt="" className="chatOnlineImg" />
        <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
    ))}
      
      
    </div>
  );
}

export default ChatOnline;
