import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const {signOutUser}=useAuth()
    const links=<>
    <NavLink className='btn mr-3' to='/'><li>Home</li></NavLink>
    <NavLink className='btn mr-3' to='/login'><li>LogIn</li></NavLink>
    <NavLink className='btn mr-3' to='/register'><li>Register</li></NavLink>
    

    </>
    const handleSignout=()=>{
        signOutUser()
        .then(res=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User signout successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
        })
        .catch(err=>console.log(err.message))
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <button onClick={handleSignout} className='btn'>signout</button>
            </div>
        </div>
    );
};

export default Navbar;