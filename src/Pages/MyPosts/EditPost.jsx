
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Helmet } from 'react-helmet';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [postDetails, setPostDetails] = useState(null);
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        axios.get(`https://volunteer-management-server-nu.vercel.app/volunteers/${id}`)
            .then(res => {
                setPostDetails(res.data[0]);
                setStartDate(new Date(res.data[0]?.deadline));
            })
            .catch(err => {
                //console.log(err.message)
            });
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const title = form.postTitle.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteersNeeded = form.noVolunteer.value;
        const deadline = startDate;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;

        const updatedPost = {
            thumbnail, title, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail
        };

        axios.put(`https://volunteer-management-server-nu.vercel.app/volunteers/${id}`, updatedPost)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Your post edited successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate(-1);
                }
            })
            .catch(err => {
                //console.log(err.message)
            });
    };

    return (
        <div className="min-h-screen pt-28 pb-12 bg-blue-700 dark:bg-gradient-to-bl from-gray-800 via-purple-900 to-black">
            <Helmet>
                <title>Edit Post | VolunSphere</title>
            </Helmet>
            <div className="p-6 mx-auto text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Edit Volunteer Need Post
                </h1>
                <form onSubmit={handleFormSubmit} className="mt-6">
                    <div className="form-control mb-4">
                        <label className="label text-lg font-medium">Thumbnail</label>
                        <input
                            name="thumbnail"
                            defaultValue={postDetails?.thumbnail}
                            type="url"
                            placeholder="Thumbnail URL"
                            className="input input-bordered w-full text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label text-lg font-medium">Post Title</label>
                        <input
                            name="postTitle"
                            defaultValue={postDetails?.title}
                            type="text"
                            placeholder="Post Title"
                            className="input input-bordered w-full text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label text-lg font-medium">Description</label>
                        <textarea
                            name="description"
                            defaultValue={postDetails?.description}
                            placeholder="Description"
                            className="textarea textarea-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="label text-lg font-medium">Category</label>
                            <select
                                name="category"
                                defaultValue={postDetails?.category}
                                className="select select-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                            >
                                <option disabled>Select your category</option>
                                <option>healthcare</option>
                                <option>education</option>
                                <option>social service</option>
                                <option>animal welfare</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="label text-lg font-medium">Location</label>
                            <input
                                name="location"
                                defaultValue={postDetails?.location}
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="label text-lg font-medium">No. of Volunteers Needed</label>
                            <input
                                name="noVolunteer"
                                defaultValue={postDetails?.volunteersNeeded}
                                type="number"
                                min={1}
                                placeholder="No. of volunteers needed"
                                className="input input-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="label text-lg font-medium">Deadline</label>
                            <DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="input input-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                        <div className="w-1/2">
                            <label className="label text-lg font-medium">Organizer Name</label>
                            <input
                                name="organizerName"
                                value={user?.displayName}
                                type="text"
                                className="input input-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                                readOnly
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="label text-lg font-medium ">Organizer Email</label>
                            <input
                                name="organizerEmail"
                                value={user?.email}
                                type="email"
                                className="input input-bordered w-full  text-gray-800  dark:bg-gray-800 border-gray-700 dark:text-gray-100"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-gray-100 text-lg font-semibold">
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
