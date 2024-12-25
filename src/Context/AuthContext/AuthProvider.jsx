
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../Firebase/Firebase.init";
import axios from "axios";
const googleAuthProvider=new GoogleAuthProvider()
const githubAuthProvider=new GithubAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userSignIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleAuthProvider)
    }
    const signInWithGithub=()=>{
        setLoading(true)
        return signInWithPopup(auth,githubAuthProvider)
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            
            setUser(currentUser)
            if(currentUser?.email){
                const user={email:currentUser.email}
                axios.post('http://localhost:5000/jwt',user,{withCredentials:true})
                .then(res=>{
                    setLoading(false)
                })
            }
            else{
                axios.post('http://localhost:5000/logout',{},{withCredentials:true})
                .then(res=>{
                    setLoading(false)
                })
            }
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    const info={
        user,
        loading,
        createUser,
        userSignIn,
        signOutUser,
        signInWithGoogle,
        signInWithGithub

    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;