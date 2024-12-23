import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";
import loginLottie from '../../assets/lottieFile/login.json'
import Lottie from "lottie-react";
const Login = () => {
    const {userSignIn}=useAuth()
    const navigate=useNavigate()
    const handleLogin=e=>{
        e.preventDefault()
        const email=e.target.email.value;
        const password=e.target.password.value;
        userSignIn(email,password)
        .then(res=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User login successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
        })
        .catch(err=>{
            console.log(err.message)
        })


    }
    return (
        <div className="w-full bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">
            <div className="hero  min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        
                        <Lottie animationData={loginLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <h1 className="mx-auto text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="divider divider-primary">OR</div>
                        <div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;