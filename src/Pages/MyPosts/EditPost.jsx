// pages/EditNeedPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const EditPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate();
    const [postDetails, setPostDetails] = useState(null);
    const { user } = useAuth()

    useEffect(() => {

        axios.get(`http://localhost:5000/volunteers/${id}`)
            .then(res => {
                setPostDetails(res.data[0])

            })
            .catch(err => {
                console.log(err.message)
            })


    }, [id]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form=e.target;
        const thumbnail=form.thumbnail.value;
        const title=form.postTitle.value;
        const description=form.description.value;
        const category=form.category.value;
        const location=form.location.value;
        const volunteersNeeded=form.noVolunteer.value;
        const deadline=form.deadline.value;
        const organizerName=form.organizerName.value;
        const organizerEmail=form.organizerEmail.value;
        const updatedPost={
            thumbnail,title,description,category,location,volunteersNeeded,deadline,organizerName,organizerEmail
        }
        axios.put(`http://localhost:5000/volunteers/${id}`,
            updatedPost)
        .then(res=>{
            if(res.data.modifiedCount){
                Swal.fire({
                    
                    icon: "success",
                    title: "User login successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate(-1)
            }
        })
        .catch(err=>{
            console.log(err.message)
        })
    };



    return (
        <div className='w-full py-16 mt-20  bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500'>
            <div className="p-4 card mx-auto bg-base-100 w-full max-w-3xl  shadow-2xl">
            <h1 className="text-2xl font-bold mb-4">Edit Volunteer Need Post</h1>
            <form onSubmit={handleFormSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Thumbnail</span>
                    </label>
                    <input name='thumbnail' defaultValue={postDetails?.thumbnail} type="url" placeholder="Thumbnail" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Post Title</span>
                    </label>
                    <input name="postTitle" defaultValue={postDetails?.title} type="text" placeholder="Post Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input name="description" defaultValue={postDetails?.description} type="textarea" placeholder="Description" className="input input-bordered" required />
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <select name="category" defaultValue={postDetails?.category} className="select select-info w-full max-w-xs">
                            <option disabled selected>Select your category</option>
                            <option>healthcare</option>
                            <option>education</option>
                            <option>social service</option>
                            <option>animal welfare</option>
                        </select>
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input name="location" defaultValue={postDetails?.location} type="text" placeholder="Location" className="input input-bordered" required />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. of volunteers needed </span>
                            </label>
                            <input name='noVolunteer' defaultValue={postDetails?.volunteersNeeded} type="number" min={1} placeholder="No. of volunteers needed " className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input name="deadline" defaultValue={postDetails?.deadline} type="date" placeholder="Deadline" className="input input-bordered" required />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Organizer name</span>
                            </label>
                            <input name='organizerName' value={user?.name} type="text" placeholder="Organizer name" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Organizer email</span>
                        </label>
                        <input name="organizerEmail" value={user?.email} type="email" placeholder="organizer email" className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-gradient-to-bl to-blue-500  from-purple-500">Update Post</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default EditPost;
