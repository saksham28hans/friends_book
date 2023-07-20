import React from 'react';
import './clfriend.css'
import { Link } from 'react-router-dom';
const Clfriend = (props) => {
const PF = process.env.REACT_APP_PUBLIC_FOLDER
const user = props.user;
  return (
    <Link to={`/profile/${user.username}`} style={{textDecoration:'none',color:'black'}}>
    <li className="sidebarFriend">
            <img src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
    </li>
    </Link>
  );
}

export default Clfriend;
