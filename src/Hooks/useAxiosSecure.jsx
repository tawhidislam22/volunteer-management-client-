import axios from "axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance=axios.create({
    baseURL:'https://jobs-portal-server-one.vercel.app',
    withCredentials:true
});
const useAxiosSecure = () => {
    const {signout}=useAuth()
    const navigate=useNavigate()
    useEffect(()=>{
     axiosInstance.interceptors.response.use(response=>{
        return response;
     },error=>{
        if(error.status===401 || error.status===403){
            signout()
            .then(()=>{
                console.log('logout user')
                navigate('/signin')
            })
            .catch(err=>{
                console.log(err)
            })
        }
        return Promise.reject(error)
     })   
    },[])
    return axiosInstance;
};

export default useAxiosSecure;