import React, { useContext,useEffect } from 'react';
import { Chat, Notifications, Person, Search } from '@material-ui/icons';
import './topbar.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const Topbar = () => {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
useEffect(() => {
 console.log(user);
}, []);
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
        <Link to='/' style={{textDecoration:'none'}}>
         <span className="logo">FriendsBook</span>
         </Link>
        </div>
        <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon'/>
          <input placeholder='Search for friends, post or video' className="searchInput" />
        </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
            <Link to='/' style={{textDecoration:'none',color:'white'}}>
                <span className="topbarLink">Homepage</span>
            </Link>
                <Link to={`/profile/${user.username}`} style={{textDecoration:'none',color:'white'}}>
                <span className="topbarLink">Timeline</span>
                </Link>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person />
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                <Link to='/messenger' style={{textDecoration:'none',color:'white'}}>
                    <Chat />
                    <span className="topbarIconBadge">1</span>
                </Link>
                </div>
                <div className="topbarIconItem">
                    <Notifications />
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt='' className='topbarImg' />
          </Link>
        </div>
    </div>
  );
}

export default Topbar;
