import axios from 'axios'
export const loginCall = async(userCredentials,dispatch)=>{
   const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
     dispatch({type:'LOGIN_START'});

     try {
        const res = await axiosInstance.post("auth/login",userCredentials);
        localStorage.setItem("user",JSON.stringify(res.data))
        dispatch({type:'LOGIN_SUCCESS',payload:res.data});
     } catch (error) {
        dispatch({type:'LOGIN_FAILURE',payload:error});
     }
}