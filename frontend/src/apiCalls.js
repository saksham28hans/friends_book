import axios from 'axios'
export const loginCall = async(userCredentials,dispatch)=>{
     dispatch({type:'LOGIN_START'});

     try {
        const res = await axios.post("auth/login",userCredentials);
        localStorage.setItem("user",JSON.stringify(res.data))
        dispatch({type:'LOGIN_SUCCESS',payload:res.data});
     } catch (error) {
        dispatch({type:'LOGIN_FAILURE',payload:error});
     }
}