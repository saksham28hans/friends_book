import React, { useEffect, useState } from 'react';
import './message.css'
import {format} from 'timeago.js'
import axios from "axios";

const Message = ({message,own,sender}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sendBy, setsendBy] = useState(null);
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  useEffect(() => {
    const getSender = async ()=>{
    const res = await axiosInstance.get(`users?userId=${sender}`);
    setsendBy(res.data);
    }
    getSender();
  }, []);
  return (
    <div className={own ? 'message own' : 'message'}>
    <div className="messageTop">
        <img src={sendBy?.profilePicture ? sendBy.profilePicture : PF + 'person/noAvatar.png'} alt="" className='messageImg'/>
        <p className='messageText'>{message.text}</p>
    </div>
    <div className="messageBottom">{format(message.createdAt)}</div>
      
    </div>
  );
}

export default Message;
