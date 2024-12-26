import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { ColorRing } from 'react-loader-spinner';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    
    useEffect(() => {
        axiosSecure.get(`/requestVolunteers?email=${user?.email}`)
            .then(res => {
                setLoading(false);
                setRequests(res.data);
            });
    }, []);

    const handleCancel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will be delete your request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://volunteer-management-server-nu.vercel.app/requestVolunteers/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            setRequests((prev) => prev.filter((request) => request._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
        );
    }

    return (
        <div className="p-4 pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <Helmet>
                <title>My requests | VolunSphere</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">My Volunteer Requests</h1>
            {requests.length === 0 ? (
                <p>No requests found. Start volunteering now!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Post Title</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Category</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Deadline</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Status</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{request.title}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{request.category}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{new Date(request.deadline).toLocaleDateString()}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{request.status}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <button
                                        onClick={() => handleCancel(request._id)}
                                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
};

export default MyRequests;
