
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";

const AddVolunteerPost = () => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());

    const handleAddVolunteer = (e) => {
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

        axios
            .post("https://volunteer-management-server-nu.vercel.app/volunteers", {
                thumbnail,
                title,
                description,
                category,
                location,
                volunteersNeeded,
                deadline,
                organizerName,
                organizerEmail,
            })
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your volunteer post added successfully",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    form.reset();
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div className="w-full pt-28 pb-10  px-4 bg-gradient-to-bl from-purple-500 via-blue-500 to-teal-500 dark:bg-gray-900 ">
            <Helmet>
                <title>Add New Post | VolunSphere</title>
            </Helmet>
            <div className="card mx-auto bg-base-100 dark:bg-gray-800 dark:text-gray-100 w-full max-w-3xl shadow-2xl p-6 sm:p-10 rounded-lg">
                <h2 className="text-center text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Add Your Volunteer Need Post
                </h2>
                <form onSubmit={handleAddVolunteer} className="space-y-6">
                    {/* Thumbnail */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium dark:text-gray-200">Thumbnail</span>
                        </label>
                        <input
                            name="thumbnail"
                            type="url"
                            placeholder="Thumbnail URL"
                            className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                            required
                        />
                    </div>
                    {/* Post Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium dark:text-gray-200">Post Title</span>
                        </label>
                        <input
                            name="postTitle"
                            type="text"
                            placeholder="Post Title"
                            className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium dark:text-gray-200">Description</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Description"
                            className="textarea textarea-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                            required
                        ></textarea>
                    </div>
                    {/* Category and Location */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">Category</span>
                            </label>
                            <select
                                name="category"
                                defaultValue="Select your category"
                                className="select select-info dark:bg-gray-700 dark:border-gray-600 w-full"
                                required
                            >
                                <option disabled>Select your category</option>
                                <option>Healthcare</option>
                                <option>Education</option>
                                <option>Social Service</option>
                                <option>Animal Welfare</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">Location</span>
                            </label>
                            <input
                                name="location"
                                type="text"
                                placeholder="Location"
                                className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                                required
                            />
                        </div>
                    </div>
                    {/* Volunteers Needed and Deadline */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">
                                    No. of Volunteers Needed
                                </span>
                            </label>
                            <input
                                name="noVolunteer"
                                type="number"
                                min={1}
                                placeholder="Number of Volunteers"
                                className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                                required
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">Deadline</span>
                            </label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                            />
                        </div>
                    </div>
                    {/* Organizer Name and Email */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">Organizer Name</span>
                            </label>
                            <input
                                name="organizerName"
                                type="text"
                                value={user?.userName || ""}
                                placeholder="Organizer Name"
                                className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                                required
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="label">
                                <span className="label-text text-lg font-medium dark:text-gray-200">Organizer Email</span>
                            </label>
                            <input
                                name="organizerEmail"
                                type="email"
                                value={user?.email || ""}
                                placeholder="Organizer Email"
                                className="input input-bordered dark:bg-gray-700 dark:border-gray-600 w-full"
                                required
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full sm:w-auto bg-gradient-to-bl from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition">
                            Add Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteerPost;
