import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance=axios.create({
    baseURL:'http://localhost:5000',
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