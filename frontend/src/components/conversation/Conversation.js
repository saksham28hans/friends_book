import {React, useEffect, useState} from 'react';
import './conversation.css'
import axios  from 'axios';

const Conversation = ({conversation,currentUser}) => {
  const [user, setuser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  useEffect(() => {
   const friendId = conversation.members.find((m)=> m !== currentUser._id);
   const getUser = async()=>{
    try {
      const res = await axiosInstance.get('users?userId='+friendId)
      setuser(res.data);
    } catch (error) {
      console.log(error);
    }
   }
   getUser();
  }, [currentUser,conversation]);

  return (
    <div className='conversation'>
     <img src={user?.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="conversationImg" />
     <span className="conversationName">{user?.username}</span> 
    </div>
  );
}

export default Conversation;
