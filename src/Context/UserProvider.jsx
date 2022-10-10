import { createUserWithEmailAndPassword,signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, signOut , GoogleAuthProvider} from "firebase/auth"
import { useEffect } from "react"
import {createContext, useState } from "react"
import { auth } from "../firebase"
export const UserContext=createContext()

const UserProvider=(props)=>{
    const [user,setUser] = useState(false)

    useEffect(()=>{
        const unsusbribe=onAuthStateChanged(auth,user=>{
            console.log(user)
            if(user){
                const {email,photoURL,displayName,uid}=user;
                setUser({email,photoURL,displayName,uid})
            }else{
                setUser(null)
            }
        })
        return ()=>unsusbribe()
    },[])

    const registerUser = (email,password)=> createUserWithEmailAndPassword(auth,email,password)

    const loginUser = (email,password) =>signInWithEmailAndPassword(auth,email,password)

    const signOutUser = () =>signOut(auth)

    const registergoogle= () => {
        const provider =new GoogleAuthProvider();
        signInWithPopup(auth,provider)
    }

    return(
        <UserContext.Provider value={{user,setUser,registerUser,loginUser,signOutUser,registergoogle}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider