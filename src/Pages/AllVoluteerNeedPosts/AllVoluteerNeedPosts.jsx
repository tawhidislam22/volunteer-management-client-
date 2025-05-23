import React, { useEffect, useState } from 'react';
import VolunteerNeedsNow from '../Home/VolunteerNeedsNow';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { FaSearch } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AllVolunteerNeedPosts = () => {
    const [volunteerPosts, setVolunteerPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true); 

    useEffect(() => {
        axios.get(`https://volunteer-management-server-nu.vercel.app/volunteers?search=${search}&page=${page}&limit=12`)
            .then(res => {
                setLoading(false);
                setVolunteerPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching volunteer needs:', error);
            });
    }, [search, page]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-200">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="#A855F7"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pb-16 pt-20 md:pt-28  bg-slate-100 dark:bg-gray-900 dark:text-gray-200 transition duration-300">
            <Helmet>
                <title>All Posts | VolunSphere</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-center text-[#544efcba] mb-10">
                    All Volunteer Needs
                </h1>
                <div className="flex justify-between items-center mb-10">
                    <div className='flex gap-6 justify-between items-center flex-col md:flex-row'>
                        <div className="relative w-full md:w-3/4 lg:w-1/2">
                            <input
                                type="text"
                                placeholder="Search by title"
                                className="border border-gray-700 outline-none pl-12 py-2 rounded-full w-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 shadow-sm focus:ring focus:ring-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute top-3 left-4 text-blue-500 dark:text-purple-400" />
                        </div>
                        <button
                            onClick={() => setIsGridView(!isGridView)}
                            className="w-1/2 px-4 py-2 bg-gradient-to-bl to-blue-500  from-purple-500 text-white rounded-full shadow hover:bg-purple-600 transition duration-300"
                        >
                            {isGridView ? 'Switch to Table View' : 'Switch to Grid View'}
                        </button>
                    </div>
                </div>
                {isGridView ? (
                    <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
                        {volunteerPosts.map((post) => (
                            <VolunteerNeedsNow key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Title</th>
                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Category</th>
                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Deadline</th>
                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteerPosts.map((post) => (
                                    <tr key={post._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{post.title}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{post.category}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{post.deadline}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            <Link to={`/postDetails/${post._id}`}><button className="text-purple-500 hover:underline">View Details</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-8 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            className={`px-4 py-2 text-lg font-medium rounded-full transition duration-300 ${page === index + 1
                                    ? 'bg-gradient-to-bl to-blue-500  from-purple-500 dark:bg-purple-500 dark:text-gray-900 shadow-lg'
                                    : 'bg-slate-200 text-gray-800 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-700 hover:text-slate-100 dark:hover:bg-gray-600'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVolunteerNeedPosts;
