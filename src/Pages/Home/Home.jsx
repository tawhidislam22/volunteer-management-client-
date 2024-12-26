import axios from "axios";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import {Helmet} from "react-helmet";
const Home = () => {
    const [allPosts, setAllPosts] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:5000/volunteers?limit=6')
            .then(res => {
                setLoading(false)
                setAllPosts(res.data.posts)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])
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
        <div>
            <div className="bg-banner-Image mt-20 bg-cover bg-center w-full ">
                <Helmet>
                    <title>Home | VolunSphere</title>
                </Helmet>
                <div className=" bg-black bg-opacity-75 mt-8">
                    <Banner></Banner>
                </div>
            </div>
            <div className="text-center my-8">
                <h2 className="text-3xl mb-3 font-semibold ">All Volunteer Posts</h2>
                <p className="w-3/4 mx-auto text-base font-medium mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam cumque ullam provident facilis, illo delectus aliquam rerum aliquid est eius? Iste dolores excepturi earum culpa. Nisi qui enim beatae voluptate.</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {
                        allPosts?.map(post => <VolunteerNeedsNow key={post._id} post={post}></VolunteerNeedsNow>)
                    }
                </div>
                <div className="py-6">

                    <Link to='/allPosts'>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition duration-300">
                            Show More
                        </button>
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default Home;