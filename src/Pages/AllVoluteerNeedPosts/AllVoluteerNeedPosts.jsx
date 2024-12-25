
import React, { useEffect, useState } from 'react';
import VolunteerNeedsNow from '../Home/VolunteerNeedsNow';
import axios from 'axios';
import {  RotatingLines } from 'react-loader-spinner';

const AllVolunteerNeedPosts = () => {
    const [volunteerPosts, setVolunteerPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(`http://localhost:5000/volunteers?search=${search}&page=${page}&limit=6`)
            .then(res => {
                setLoading(false)
                setVolunteerPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching volunteer needs:', error);
            })
    }, [search, page]);

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">All Volunteer Needs</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by title"
                    className="border rounded p-2 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerPosts.map((post) => <VolunteerNeedsNow key={post._id} post={post}></VolunteerNeedsNow>)

                }
            </div>
            <div className="mt-8 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index + 1)}
                        className={`px-4 py-2 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllVolunteerNeedPosts;
