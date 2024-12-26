
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage1 from "../../assets/BannerImage/bannerImage1.jpg";
import bannerImage2 from "../../assets/BannerImage/bannerImage2.jpg";
import bannerImage3 from "../../assets/BannerImage/bannerImage3.jpg";

const Banner = () => {
    const settings = {
        dots: true,                
        infinite: true,            
        slidesToShow: 1,           
        slidesToScroll: 1,         
        autoplay: true,            
        autoplaySpeed: 3500,       
                
    };

    return (
        <div className="max-w-6xl pt-16 mx-auto overflow-hidden">
            <div className="w-full">
                <Slider {...settings}>
                    {/* Slide 1 */}
                    <div className=" w-full flex items-center justify-center">
                        <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage1}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold text-blue-400">Join Hands to Make a Difference – Explore Volunteer Opportunities Near You!</h1>
                                    <p className="py-6 text-gray-200">
                                    Welcome to our volunteer management platform, where opportunities to make a difference await. Connect with meaningful causes, post volunteer needs, or lend a helping hand to those in your community. Together, let's create a positive impact and build a better tomorrow!
                                    </p>
                                    <button className="btn btn-primary">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className=" w-full flex items-center justify-center">
                        <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage2}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold text-blue-400">Join Hands to Make a Difference – Explore Volunteer Opportunities Near You!</h1>
                                    <p className="py-6 text-gray-200">
                                    Welcome to our volunteer management platform, where opportunities to make a difference await. Connect with meaningful causes, post volunteer needs, or lend a helping hand to those in your community. Together, let's create a positive impact and build a better tomorrow!
                                    </p>
                                    <button className="btn btn-primary">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className=" w-full flex items-center justify-center">
                        <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage3}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold text-blue-400">Join Hands to Make a Difference – Explore Volunteer Opportunities Near You!</h1>
                                    <p className="py-6 text-gray-200">
                                    Welcome to our volunteer management platform, where opportunities to make a difference await. Connect with meaningful causes, post volunteer needs, or lend a helping hand to those in your community. Together, let's create a positive impact and build a better tomorrow!
                                    </p>
                                    <button className="btn btn-primary">Explore More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Banner;
