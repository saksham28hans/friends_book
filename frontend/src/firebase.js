// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyCdXOK3QLVI5RbyzUWCc9NTwWVnqcQHHag",
  authDomain: "friends-book-54efb.firebaseapp.com",
  projectId: "friends-book-54efb",
  storageBucket: "friends-book-54efb.appspot.com",
  messagingSenderId: "636064077833",
  appId: "1:636064077833:web:7b4b588a8047b23f2240d8",
  measurementId: "G-SQ8E7LYKYV"
};

const app = firebase.initializeApp(firebaseConfig);

const storage = app.storage();

export default storage;