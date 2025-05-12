
import axios from "axios";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import LatestNews from "./LatestNews";
const Home = () => {
    const [allPosts, setAllPosts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://volunteer-management-server-nu.vercel.app/volunteers?limit=8")
            .then((res) => {
                setLoading(false);
                setAllPosts(res.data.posts);
            })
            .catch((err) => {
                //console.log(err.message);
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
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Helmet>
                <title>Home | VolunSphere</title>
            </Helmet>

            {/* Banner Section */}
            <div className="bg-banner-Image bg-cover bg-center  w-full">
                <div className="bg-black bg-opacity-75 ">
                    <Banner />
                </div>
            </div>

            {/* Volunteer Posts Section */}
            <div id="allposts" className="text-center pt-12 px-4 sm:px-8 lg:px-16 w-full">
                <h2 className="text-3xl sm:text-4xl mb-3 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    All Volunteer Posts
                </h2>
                <p className="max-w-3xl mx-auto text-base font-medium mb-6">
                    Discover meaningful volunteer opportunities and make a difference in your community with VolunSphere. Explore diverse causes, connect with organizations, and contribute your time to create a positive impact. Join us today to inspire change and support those in need!
                </p>

                {/* Posts Grid */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  mx-auto w-full items-stretch">
                    {allPosts?.map((post) => (
                        <VolunteerNeedsNow key={post._id} post={post} />
                    ))}
                </div>

                {/* Show More Button */}
                <div className="py-6">
                    <Link to="/allPosts">
                        <button className="bg-gradient-to-bl to-blue-500  from-purple-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 dark:hover:bg-purple-700 transition duration-300">
                            Show More
                        </button>
                    </Link>
                </div>

                <section className="py-16">
                    <h2 className="text-4xl font-extrabold text-center text-[#544efcba] mb-8">
                        What Our Volunteers Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-gray-700 dark:text-gray-300">
                                "VolunSphere has changed the way I approach volunteering. The platform is easy to use and has connected me with amazing causes!"
                            </p>
                            <h3 className="mt-4 font-semibold text-[#544efcba]">- Alex Johnson</h3>
                        </div>
                        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-gray-700 dark:text-gray-300">
                                "I found the perfect volunteer opportunity through VolunSphere. It's a fantastic resource for giving back to the community."
                            </p>
                            <h3 className="mt-4 font-semibold text-[#544efcba] ">- Maria Lopez</h3>
                        </div>
                        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-gray-700 dark:text-gray-300">
                                "The best platform for anyone looking to make a real impact. Highly recommended!"
                            </p>
                            <h3 className="mt-4 font-semibold text-[#544efcba]">- John Doe</h3>
                        </div>
                    </div>
                </section>

                {/* Extra Section 2: How It Works */}
                <section className="py-16">
                    <h2 className="text-4xl font-extrabold text-center text-[#544efcba] mb-8">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-5xl text-[#544efcba] mb-4">1</div>
                            <Link  className="text-xl font-semibold mb-2">Sign Up</Link>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create an account to get started as a volunteer or an organizer.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-5xl text-[#544efcba] mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Browse and select from hundreds of volunteering opportunities.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-5xl text-[#544efcba] mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Volunteer and contribute to meaningful causes in your community.
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <LatestNews></LatestNews>
                </section>
                <section className="py-16">
                    <div className="container py-12 rounded-lg mx-auto text-center  bg-gradient-to-bl to-blue-500  from-purple-500 text-gray-100 ">
                        <h2 className="text-4xl font-extrabold mb-4">Join Us Today!</h2>
                        <p className="text-lg mb-6">
                            Be a part of our vibrant volunteer community. Together, we can make a difference!
                        </p>
                        <Link  className="bg-gray-900 text-gray-100 py-3 px-8 rounded-full text-lg font-medium hover:bg-gray-700 transition duration-300" to='/register'>
                            Sign Up Now
                        </Link>
                    </div>
                </section>
                
            </div>
        </div>
    );
};

export default Home;
