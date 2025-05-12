import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(false);

    // ✅ Load from localStorage on initial render
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedPhoto = localStorage.getItem("userPhoto");
        if (storedName) setName(storedName);
        if (storedPhoto) setPhoto(storedPhoto);
    }, []);

    // ✅ Update localStorage and state
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedName = e.target.name.value;
        const updatedPhoto = e.target.photo.value;

        localStorage.setItem("userName", updatedName);
        localStorage.setItem("userPhoto", updatedPhoto);

        setName(updatedName);
        setPhoto(updatedPhoto);

        toast.success("Your Profile is updated!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setEditMode(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-8 md:mt-12 lg:mt-16">
            <Helmet>
                <title>MyProfile | VolunSphere</title>
            </Helmet>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold">Welcome, {name || user?.displayName}!</h1>
            </div>
            <div className="flex flex-col items-center mt-8">
                <img
                    src={photo || user?.photoURL}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                {!editMode ? (
                    <>
                        <h2 className="text-2xl font-bold mt-4">{name || user?.displayName}</h2>
                        <p className="text-gray-600 mt-2">{user?.email || "Email"}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setEditMode(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <form
                        onSubmit={handleUpdate}
                        className="mt-4 w-full max-w-md flex flex-col"
                    >
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name || user?.displayName}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
                            required
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-4">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photo"
                            defaultValue={photo || user?.photoURL}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
                            required
                        />

                        <div className="mt-4 flex justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
