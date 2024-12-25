
// pages/MyNeedPosts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)





    useEffect(() => {

        axios.get(`http://localhost:5000/volunteers/email?email=${user?.email}`,{withCredentials:true})
            .then(res => {
                setLoading(false)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })


    }, [user?.email]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/volunteers/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            setPosts((prev) => prev.filter((post) => post._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });

    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        )
    }


    return (
        <div className="p-4 mt-20">
            <h1 className="text-2xl font-bold mb-4">My Volunteer Need Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found. Create your first volunteer need post now!</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Post Title</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Deadline</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id}>
                                <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{post.category}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(post.deadline).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{post.location}</td>
                                <td className="border border-gray-300 px-4 py-2">

                                    <Link to={`/myPosts/edit/${post._id}`}>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default MyPosts;
