import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import icons from "../../assets/icons/icons.png";
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { signOutUser, user, theme, toggleTheme } = useAuth();
    const navigate = useNavigate();

    const links = (
        <>
            <NavLink
                className={({ isActive }) =>
                    `btn mr-3 ${
                        isActive
                            ? " bg-gradient-to-bl to-blue-500  from-purple-500 text-white"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    }`
                }
                to='/'
            >
                <li>Home</li>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `btn mr-3 ${
                        isActive
                            ? "bg-gradient-to-bl to-blue-500  from-purple-500 text-white"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    }`
                }
                to='/allPosts'
            >
                <li>All Volunteer Need Posts</li>
            </NavLink>
            {user ? (
                <NavLink
                    className={({ isActive }) =>
                        `btn mr-3 ${
                            isActive
                                ? "bg-gradient-to-bl to-blue-500  from-purple-500 text-white"
                                : "hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        }`
                    }
                    to='/addVolunteerPost'
                >
                    <li>Add Volunteer Post</li>
                </NavLink>
            ) : null}
        </>
    );

    const handleSignout = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User signed out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((err) => {
                //console.log(err.message)
            });
    };

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-md dark:bg-gray-900 dark:text-gray-100 transition duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <div className='hidden md:block'>
                <Link
                    onClick={() => navigate('/')}
                    className="btn flex gap-4 btn-ghost text-xl "
                >
                    <img className="w-12" src={icons} alt="icon" /> VolunSphere
                </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end flex items-center">
                {user ? (
                    <>
                        <div className="dropdown dropdown-end mr-3">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User avatar"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={user?.displayName}
                                        data-tooltip-place="top"
                                        src={user?.photoURL}
                                    />
                                    <Tooltip id="my-tooltip" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        `btn mr-3 mb-3 ${
                                            isActive
                                                ? "bg-gradient-to-tr from-green-500 to-yellow-400 text-white"
                                                : "hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        }`
                                    }
                                    to='/myPosts'
                                >
                                    <li>My Posts</li>
                                </NavLink>
                                <NavLink
                                    className={({ isActive }) =>
                                        `btn mr-3 ${
                                            isActive
                                                ? "bg-gradient-to-tr from-green-500 to-yellow-400 text-white"
                                                : "hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        }`
                                    }
                                    to='/myRequests'
                                >
                                    <li>My Requests</li>
                                </NavLink>
                            </ul>
                        </div>
                        <button
                            onClick={handleSignout}
                            className="btn btn-sm btn-outline dark:bg-gray-700 dark:text-base-100"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            className="btn mr-3 bg-gradient-to-bl to-blue-500  from-purple-500 text-white"
                            to='/login'
                        >
                            Log In
                        </NavLink>
                        <NavLink
                            className="btn mr-3 bg-gradient-to-bl to-blue-500  from-purple-500 text-white"
                            to='/register'
                        >
                            Register
                        </NavLink>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    className="ml-3 p-2 rounded focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
