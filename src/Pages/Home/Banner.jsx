import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage1 from "../../assets/BannerImage/bannerImage1.png"
import bannerImage2 from "../../assets/BannerImage/bannerImage2.jpg"
import bannerImage3 from "../../assets/BannerImage/bannerImage3.jpg"
const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
    };

    return (
        <div className=" bg-banner-Image bg-cover bg-center">
            <div className="   bg-black bg-opacity-50">
                <Slider {...settings}>
                    <div className=" w-full flex items-center justify-center">
                        <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage1}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                                    <p className="py-6">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                                    </p>
                                    <button className="btn btn-primary">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex items-center justify-center">
                    <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage2}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                                    <p className="py-6">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                                    </p>
                                    <button className="btn btn-primary">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex items-center justify-center">
                    <div className="hero  min-h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src={bannerImage3}
                                    className="max-w-sm rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                                    <p className="py-6">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                                    </p>
                                    <button className="btn btn-primary">Get Started</button>
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
