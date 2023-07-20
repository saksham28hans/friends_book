import {React, useContext, useEffect,useState} from 'react';
import './rightbar.css'
import {Users} from  '../../dummyData'
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
const Rightbar = ({user}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setfriends] = useState([]);
  const {user:currentUser,dispatch} = useContext(AuthContext)
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  


  useEffect(() => {
      const getFriends = async()=>{
        try {
        console.log(user);
          if(user)
          {
          const friendList = await axiosInstance.get('users/friends/'+user._id)
          setfriends(friendList.data);
          }
          else
          {
            const friendList_current = await axiosInstance.get('users/friends/'+currentUser._id)
          setfriends(friendList_current.data);
          }
        } catch (error) {
          console.log(error)
        }
      };
      getFriends()
     }, [user]);
    
  const HomeRightBar = ()=>{
    return (
      <>
       <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Sarthak</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
         {friends.map((user)=>{
          return <Online key ={user.id} user={user} />
         })}
        </ul>
      </>
    )
  }
  const ProfileRightBar = ()=>{
    const [followed, setfollowed] = useState(currentUser.following.includes(user?._id));
    const handleFollow = async()=>{
      try {
        if(followed)
        {
          await axiosInstance.put('users/'+user._id + '/unfollow',{
            userId : currentUser._id,
          })
          const user_local = JSON.parse(localStorage.getItem("user"));
                  user_local["following"] = user_local["following"].filter((follow)=>
                  follow !== user._id
               )
          localStorage.setItem("user",JSON.stringify(user_local))
          dispatch({type:"UNFOLLOW",payload:user._id})
        }
        else
        {
          await axiosInstance.put('users/'+user._id + '/follow',{
            userId : currentUser._id,
          })
          const user_local1 = JSON.parse(localStorage.getItem("user"));
          user_local1["following"] = [...user_local1["following"],user._id]
          localStorage.setItem("user",JSON.stringify(user_local1))
          dispatch({type:"FOLLOW",payload:user._id})
        }
      } catch (error) {
        console.log(error);
      }
      setfollowed(!followed)
    }

    return (
      <>
      {user.username !== currentUser.username && (
        <button className='rightbarFollowButton' onClick={handleFollow}>
        {followed ? "Unfollow" : "Follow"}
        {followed ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" :"-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend)=>{
          return <Link key ={friend._id} to={'/profile/'+friend.username} style={{textDecoration:'none'}}>
          <div className="rightbarFollowing">
            <img src={friend.profilePicture ? friend.profilePicture : PF+'person/noAvatar.png'} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
        })}  
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
      {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
