import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";


const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const INITIAL_STATE = {
    user : user,
    isFetching : false,
    error : false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching : state.isFetching,
            error : state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}