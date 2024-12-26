
import React, { useState } from 'react';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const VolunteerPostDetails = () => {
    const navigate = useNavigate();
    const data = useLoaderData()
    const [editMode, setEditMode] = useState(false);
    const [suggestion, setSuggestion] = useState("");

    const post = data[0]
    const { user } = useAuth()

    const handleBeAVolunteer = () => {
        if (user?.email === post.organizerEmail) {
            toast.warn('You are the host of this project!', {
                position: "top-center",
                autoClose: 1499,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setEditMode(true)
        }
    }

    const handleRequest = e => {
        e.preventDefault()

        if (post.volunteersNeeded !== 0) {
            axios.post('http://localhost:5000/requestVolunteers', {
                postId: post._id,
                volunteerName: user?.name,
                volunteerEmail: user?.email,
                suggestion,
                status: "requested",
                organizerEmail: post.organizerEmail
            })
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: "Your volunteer post added successfully",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        e.target.reset()
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })

            setEditMode(false)
        } else {
            toast.warn('No volunteer post available now!', {
                position: "top-center",
                autoClose: 1499,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="p-4 mt-20 dark:bg-gray-800 dark:text-white">
            <Helmet>
                <title>Post Details | VolunSphere</title>
            </Helmet>
            <button onClick={() => navigate(-1)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700">
                Back
            </button>
            <div className='w-full'>
                <div className="max-w-4xl mx-auto p-8 bg-slate-200 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg">

                    <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">{post.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div>
                            <p className="text-gray-700 mt-2 dark:text-gray-300">{post.description}</p>
                            <p className="text-gray-600 mt-2 dark:text-gray-400"><strong>Category:</strong> {post.category}</p>
                            <p className="text-gray-600 mt-2 dark:text-gray-400"><strong>Location:</strong> {post.location}</p>
                            <p className="text-gray-600 mt-2 dark:text-gray-400"><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
                            <p className="text-gray-600 mt-2 dark:text-gray-400"><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
                            <p className="text-gray-600 mt-2 dark:text-gray-400"><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>

                            {!editMode ? (
                                <button onClick={handleBeAVolunteer} className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                                    Be a Volunteer
                                </button>
                            ) : (
                                <form onSubmit={handleRequest} className="mt-4 w-full max-w-md flex flex-col">
                                    <div className="mb-4">
                                        <label htmlFor="volunteerName" className="block text-gray-700 font-bold dark:text-gray-300">Your Name</label>
                                        <input
                                            type="text"
                                            id="volunteerName"
                                            value={user?.displayName || ""}
                                            disabled
                                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="volunteerEmail" className="block text-gray-700 font-bold dark:text-gray-300">Your Email</label>
                                        <input
                                            type="email"
                                            id="volunteerEmail"
                                            value={user?.email || ""}
                                            disabled
                                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="suggestion" className="block text-gray-700 font-bold dark:text-gray-300">Your Suggestion</label>
                                        <textarea
                                            id="suggestion"
                                            value={suggestion}
                                            onChange={(e) => setSuggestion(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                                        >
                                            Request
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                                            onClick={() => setEditMode(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerPostDetails;
