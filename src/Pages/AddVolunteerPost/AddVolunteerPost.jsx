import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'

const AddVolunteerPost = () => {
    const { user } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const handleAddVolunteer = e => {
        e.preventDefault()
        const form = e.target;
        const thumbnail = form.thumbnail.value;
        const title = form.postTitle.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteersNeeded = form.noVolunteer.value;
        const deadline = startDates;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;


        axios.post('http://localhost:5000/volunteers', {
            thumbnail, title, description, category, location, volunteersNeeded, deadline, organizerName, organizerEmail
        })
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your volunteer post added successfully",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    form.reset()
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <div className="w-full py-16 mt-20  bg-gradient-to-bl to-teal-500 via-blue-500  from-purple-500">
            <div className="card mx-auto bg-base-100 w-full max-w-3xl  shadow-2xl">
                <h2 className="mx-auto pt-4 text-4xl font-bold bg-gradient-to-b from-blue-500 to-purple-500 bg-clip-text text-transparent">Add your volunteer need post</h2>
                <form onSubmit={handleAddVolunteer} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Thumbnail</span>
                        </label>
                        <input name='thumbnail' type="url" placeholder="Thumbnail" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Post Title</span>
                        </label>
                        <input name="postTitle" type="text" placeholder="Post Title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Description</span>
                        </label>
                        <input name="description" type="textarea" placeholder="Description" className="input input-bordered" required />
                    </div>
                    <div className="flex w-full gap-4 grow">
                        <div className="w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Category</span>
                            </label>
                            <select name="category" defaultValue='Select your category' className="select select-info w-full max-w-xs">
                                <option disabled selected>Select your category</option>
                                <option>healthcare</option>
                                <option>education</option>
                                <option>social service</option>
                                <option>animal welfare</option>
                            </select>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Location</span>
                            </label>
                            <input name="location" type="text" placeholder="Location" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">No. of volunteers needed </span>
                                </label>
                                <input name='noVolunteer' type="number" min={1} placeholder="No. of volunteers needed " className="input input-bordered" required />
                            </div>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Deadline</span>
                            </label>
                            {/* <input name="deadline" type="date" placeholder="Deadline" className="input  outline-blue-600" required /> */}
                            <div className="w-full gap-4 p-2"><DatePicker
                                showIcon
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                
                            /></div>
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Organizer name</span>
                                </label>
                                <input name='organizerName' value={user?.userName} type="text" placeholder="Organizer name" className="input outline-blue-600" required />
                            </div>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Organizer email</span>
                            </label>
                            <input name="organizerEmail" value={user?.email} type="email" placeholder="organizer email" className="input  outline-blue-600" required />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-bl to-blue-500  from-purple-500">Add Post Button</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteerPost;