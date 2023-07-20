import {React, useState,useEffect} from 'react';
import axios from 'axios'
import './profile.css'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {useParams} from 'react-router';
import storage from '../../firebase';

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

  useEffect(() => {
    const fetchUser = async()=>{
       const res = await axiosInstance.get(`users?username=${username}`)
       setUser(res.data)
    }
    fetchUser()
}, [username]);

const handleChange = (e)=>{
  const file = e.target.files[0];
  const filename = new Date().getTime() + 'profilePicture' + file.name;
      const uploadTask = storage.ref(`/items/${filename}`).put(file);
      uploadTask.on("state_changed",
      (snapshot)=>{
          console.log(snapshot);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done.");
       },
       (err)=>{
          console.log(err);
       },
       ()=>{
          uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
              const updateUser = JSON.parse(localStorage.getItem('user'));
              updateUser.profilePicture = url;
              localStorage.setItem('user',JSON.stringify(updateUser));
              const updateImage = async ()=>{
                   try {
                    await axiosInstance.put(`users/${user._id}`,{userId:user._id,profilePicture:url})
                   } catch (error) {
                     
                   }
              }
              updateImage()
              window.location.reload();
          });
       }
       );
}

const handleChangeCover = (e)=>{
  const file = e.target.files[0];
  const filename = new Date().getTime() + 'coverPicture' + file.name;
      const uploadTask = storage.ref(`/items/${filename}`).put(file);
      uploadTask.on("state_changed",
      (snapshot)=>{
          console.log(snapshot);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done.");
       },
       (err)=>{
          console.log(err);
       },
       ()=>{
          uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
              const updateCover = JSON.parse(localStorage.getItem('user'));
              updateCover.coverPicture = url;
              localStorage.setItem('user',JSON.stringify(updateCover));
              const updateImageCover = async ()=>{
                   try {
                    await axiosInstance.put(`users/${user._id}`,{userId:user._id,coverPicture:url})
                   } catch (error) {
                     
                   }
              }
              updateImageCover()
              window.location.reload();
          });
       }
       );
}

  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
                <img src={user.coverPicture ? user.coverPicture : PF+"person/noCover.png"} alt="" className="profileCoverImg" />
                <img src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" className="profileUserImg" />
                <label htmlFor='file' className="shareOption">
                <CameraAltIcon className='camera'/>
                <input style={{display:'none'}} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={handleChange}/>
                </label>
                <label htmlFor='file_cover' className="shareOption">
                <CameraAltIcon className='camera_cover'/>
                <input style={{display:'none'}} type="file" id="file_cover" accept='.png,.jpeg,.jpg' onChange={handleChangeCover}/>
                </label>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
        </div>
        <div className="profileRightBottom">
        <Feed  username={username}/>
      <Rightbar user={user}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
