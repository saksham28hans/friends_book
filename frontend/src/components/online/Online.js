import React from 'react';
import './online.css'
import { Link } from 'react-router-dom';
const Online = (props) => {
  const user = props.user
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <Link to='/messenger' style={{textDecoration:'none',color:'black'}}>
    <li className="rightbarFriend">
    <div className="rightbarprofileImgContainer">
      <img src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="rightbarProfileImg" />
      {/* <span className="rightbarOnline"></span> */}
    </div>
    <span className="rightbarUsername">{user.username}</span>
    </li>
    </Link>
  );
}

export default Online;
