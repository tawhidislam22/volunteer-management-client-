
import axios from "axios";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Home = () => {
    const [allPosts, setAllPosts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/volunteers?limit=6")
            .then((res) => {
                setLoading(false);
                setAllPosts(res.data.posts);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
            <Helmet>
                <title>Home | VolunSphere</title>
            </Helmet>

            {/* Banner Section */}
            <div className="bg-banner-Image bg-cover bg-center w-full">
                <div className="bg-black bg-opacity-75">
                    <Banner />
                </div>
            </div>

            {/* Volunteer Posts Section */}
            <div className="text-center my-8 px-4 sm:px-8 lg:px-16">
                <h2 className="text-3xl sm:text-4xl mb-3 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    All Volunteer Posts
                </h2>
                <p className="max-w-3xl mx-auto text-base font-medium mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam cumque ullam
                    provident facilis, illo delectus aliquam rerum aliquid est eius? Iste dolores
                    excepturi earum culpa. Nisi qui enim beatae voluptate.
                </p>

                {/* Posts Grid */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {allPosts?.map((post) => (
                        <VolunteerNeedsNow key={post._id} post={post} />
                    ))}
                </div>

                {/* Show More Button */}
                <div className="py-6">
                    <Link to="/allPosts">
                        <button className="bg-blue-500 dark:bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 dark:hover:bg-purple-700 transition duration-300">
                            Show More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
