import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginLottie from '../../assets/lottieFile/login.json'
import Lottie from "lottie-react";
import auth from "../../Firebase/Firebase.init";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";
const Login = () => {
    const { userSignIn } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state || "/"
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef()
    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        userSignIn(email, password)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .catch(err => {
                //console.log(err.message)
            })


    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error('Please provide your email', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    toast.error('password reset email send', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });

                })
                .catch(error => {
                    //console.log(error.message)
                })
        }
    }
    return (
        <div className="w-full mt-20   bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">
            <Helmet>
                <title>Login | VolunSphere</title>
            </Helmet>
            <div className="hero p-4  min-h-screen dark:bg-gray-900 dark:text-white">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">

                        <Lottie animationData={loginLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl  dark:bg-gray-800 ">
                        <h1 className="mx-auto pt-4 text-4xl font-bold bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent">Login now!</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label ">
                                    <span className="label-text text-xl font-medium dark:text-slate-100">Email</span>
                                </label>
                                <input name="email" ref={emailRef} type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-xl font-medium dark:text-slate-100">Password</span>
                                </label>
                                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs text-lg absolute right-2 top-14">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn  text-gray-900  text-xl font-medium  bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">Login</button>
                            </div>
                        </form>
                        <div className="ml-4 text-lg">
                            <p>You have no account? please <Link className="text-purple-500" to='/register'>Register</Link></p>
                        </div>
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