import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { signInWithGoogle, signInWithGithub } = useAuth()
    const navigate=useNavigate()
    const handleSignInGoogle = () => {
        signInWithGoogle()
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const handleSignInGithub = () => {
        signInWithGithub()
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .then(err => console.log(err.message))
    }
    return (
        <div className="flex flex-col gap-4">
            <button onClick={handleSignInGoogle}>Sign in Google</button>
            <button onClick={handleSignInGithub}>Sign in Github</button>
        </div>
    );
};

export default SocialLogin;