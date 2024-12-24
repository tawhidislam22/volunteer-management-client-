import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import registerLottie from '../../assets/lottieFile/register.json'
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
const Register = () => {
    const { createUser } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        
        if (password.length < 6) {

            toast.error('Password should be 6 character or longer', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-z])[A-Za-z]{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('At Least one uppercase, one lowercase', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            return;
        }
        createUser(email, password)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Create Account successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(err => console.log(err.message))

    }
    return (
        <div className="w-full bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">
            <div className="hero  min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-[600px]">
                        <Lottie animationData={registerLottie}></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <h1 className="text-4xl font-bold mx-auto p-4 bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent">Register now!</h1>

                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label text-xl font-medium">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Photo URL</span>
                                </label>
                                <input name="photoURL" type="url" placeholder="photoURL" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Password</span>
                                </label>
                                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered" required />
                                <button onClick={() => setShowPassword(!showPassword)} className="btn btn-xs text-xl absolute right-2 top-14">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn  text-gray-900  text-xl font-medium bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">Register</button>
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

export default Register;