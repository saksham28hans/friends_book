import React, { useContext,useState ,useEffect,useRef} from 'react';
import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import {io} from "socket.io-client";

const Messenger = () => {

    const {user} = useContext(AuthContext);
    const [conversation, setconversation] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    // const [socket, setsocket] = useState(null);
    const [messages, setmessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const scrollRef = useRef();
    const [onlineFriends, setonlineFriends] = useState([]);
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
    const socket = useRef()


    useEffect(() => {
        
      socket.current = io("ws://localhost:8900")
      socket.current.on("getMessage",(data)=>{
        setarrivalMessage({
            senderId : data.senderId,
            text : data.text,
            createdAt : Date.now(),
        });
      });
    }, []);
   
    useEffect(() => {
       arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
       setmessages((prev)=> [...prev,arrivalMessage]);
    }, [arrivalMessage,currentChat]);
   

    useEffect(() => {
        socket.current.emit("adduser",user._id);
        socket.current.on("getUsers",users=>{
          console.log(users)
          setonlineFriends(user?.following.filter((f)=>users.some(u=>u.userId ===f)))
        })
      }, [user]);
    
    useEffect(() => {
       const getConversations = async()=>{
        try {
            const res = await axiosInstance.get('conversations/'+user._id)
            setconversation(res.data)
        } catch (error) {
            console.log(error);
        }
        
       }
       getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async()=>{
         try {
           const res = await axiosInstance.get('messages/'+currentChat?._id)
           setmessages(res.data);
         } catch (error) {
           console.log(error);
         }
        }
        getMessages();
     }, [currentChat]);

     useEffect(() => {
       scrollRef.current?.scrollIntoView({behavior : "smooth"});
     }, [messages]);

     const handleClick = async(e)=>{
        e.preventDefault();
        const message = {
            conversationId : currentChat._id,
            senderId : user._id,
            text : newMessage,
        };
        
        const receiverId = currentChat.members.find(mem=>mem !== user._id)

        socket.current.emit("sendMessage",{
            senderId : user._id,
            receiverId,
            text : newMessage,
        })
       
        try {
            const res = await axiosInstance.post('messages',message);
            setmessages([...messages,res.data])   
            setnewMessage("");
        } catch (error) {
            console.log(error);
        }
     }
    return (
        <>
            <Topbar />
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className="chatMenuInput" />
                        {conversation.map((c)=>(
                            <div key={c._id} onClick={()=> setcurrentChat(c)}>
                            <Conversation conversation={c} currentUser = {user} />
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                        <div className="chatBoxTop">
                           {messages.map((m)=>(
                            <div key={m._id} ref={scrollRef}>
                            <Message message={m} own={m.senderId ===user._id} sender={m.senderId} />
                            </div>
                           ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder='Write something....'
                            onChange={(e)=>{setnewMessage(e.target.value)}} 
                            value={newMessage}></textarea>
                            <button className='chatSubmitButton' onClick={handleClick}>Send</button>
                        </div>
                        </>) : <span className="noConversation">Open a conversation to start a chat.</span> }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineFriends = {onlineFriends} currentId = {user._id} setcurrentChat={setcurrentChat} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;
