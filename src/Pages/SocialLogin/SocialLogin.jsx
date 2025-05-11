import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import googleIcon from '../../assets/icons/google.png'
import githubIcon from '../../assets/icons/github.png'

const SocialLogin = () => {
    const { signInWithGoogle, signInWithGithub } = useAuth()
    const location=useLocation()
    const navigate=useNavigate()
    const from=location.state || "/"
    const handleSignInGoogle = () => {
        signInWithGoogle()
            .then(res => {
                Swal.fire({
                    
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
    const handleSignInGithub = () => {
        signInWithGithub()
            .then(res => {
                Swal.fire({
                    
                    icon: "success",
                    title: "User login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .then(err => {
                //console.log(err.message)
            }
                )
    }
    return (
        <div className="flex flex-col gap-4 pb-4">
            <div className="btn flex gap-6">
             <img className="w-10" src={googleIcon} alt="" />   
            <button className="text-xl font-semibold" onClick={handleSignInGoogle}>Sign in Google</button>
            </div>
            <div className="btn flex gap-6">
             <img className="w-10" src={githubIcon} alt="" />   
             <button className="text-xl font-semibold" onClick={handleSignInGithub}>Sign in Github</button>
            </div>
            
        </div>
    );
};

export default SocialLogin;