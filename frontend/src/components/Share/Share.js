import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons';
import React, { useContext, useRef, useState,useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './share.css';
import axios from 'axios';
import storage from '../../firebase';

const Share = () => {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setfile] = useState(null);
  const [uploaded, setuploaded] = useState(false);
  const [post, setpost] = useState({userId : user?._id});
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  // const [imgUrl, setimgUrl] = useState(initialState);


  const handleChange = (e)=>
  {
      const value = e.target.value;
      setpost({...post , [e.target.name] : value})
  };
  const handleshareSubmit = async(e)=>{
  e.preventDefault()
  const newPost = {
    userId : user._id,
    desc : desc.current.value,
  }
    if(file)
    {
      // const data = new FormData();
      // const filename = Date.now() + file.name;
      // data.append("name",filename);
      // data.append("file",file);
      // newPost.img = filename

      // try {
      //   await axios.post("/upload",data);
      // } catch (error) {
      //   console.log(error);
      // }

      const filename = new Date().getTime() + 'img' + file.name;
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
              newPost.img = url
              setpost((prev)=>{
                return { ...prev, 'img': url};
            });
              setuploaded(true)
          });
       }
       );
    }
    else
    {
      setuploaded(true)
    }
  }

  useEffect(() => {
    if(uploaded)
    {
      const createPost = async()=>{
        try {
          await axiosInstance.post('posts',post);
          window.location.reload();
        } catch (error) {
          
        }
      }
      createPost();
    }
  }, [uploaded]);
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="shareProfileImg" />
            <input placeholder={`What's in your mind ${user.username} ?`} className="shareInput" name='desc' ref={desc} onChange={handleChange} />
        </div>
        <hr className="shareHr" />
        {file &&  (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className='shareImg'/>
            <Cancel className='shareCancelImg' onClick ={()=>{setfile(null)}} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleshareSubmit}>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon' />
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:'none'}} type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>{
                      setfile(e.target.files[0])
                    }}/>
                </label>
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon' />
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon' />
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;
