import useAuth from "../../Hooks/useAuth";


const SocialLogin = () => {
    const {signInWithGoogle,signInWithGithub}=useAuth()
    const handleSignInGoogle=()=>{
        signInWithGoogle()
        .then(res=>console.log(res))
        .catch(err=>{
            console.log(err.message)
        })
    }
    const handleSignInGithub=()=>{
        signInWithGithub()
        .then(res=>{
            console.log(res)
        })
        .then(err=>console.log(err.message))
    }
    return (
        <div className="flex flex-col gap-4">
            <button onClick={handleSignInGoogle}>Sign in Google</button>
            <button onClick={handleSignInGithub}>Sign in Github</button>
        </div>
    );
};

export default SocialLogin;