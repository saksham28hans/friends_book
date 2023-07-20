import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './sidebar.css';
// import {Users} from '../../dummyData'
import Clfriend from '../clfriend/Clfriend';
import axios from "axios";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [Users, setUsers] = useState(null);
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  useEffect(() => {
    const getallUsers = async()=>{
   const res1 = await axiosInstance.get('users/all')
    setUsers(res1.data)
    }
    getallUsers();
  }, []);
  
  return (
    <div className='sidebar'>
       <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon'/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className='sidebarIcon'/>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className='sidebarIcon'/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className='sidebarIcon'/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className='sidebarIcon'/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className='sidebarIcon'/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className='sidebarIcon'/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className='sidebarIcon'/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className='sidebarIcon'/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <div className='sidebarText' style={{marginBottom:'10%', fontWeight:'bold'}}>
        People you may know
        </div>
        
        <ul className="sidebarFriendList">
          {Users?.map((user)=>{
            return <Clfriend key={user.id} user={user} />
          })}
        </ul>
       </div>
    </div>
  );
}

export default Sidebar;
