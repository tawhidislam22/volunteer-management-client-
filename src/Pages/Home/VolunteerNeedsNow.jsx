import { Link } from "react-router-dom";
import 'animate.css';
import { Fade } from "react-awesome-reveal";

const VolunteerNeedsNow = ({ post }) => {
    const { _id, thumbnail, title, category } = post;
    
    return (
        <Fade>
            <div className="border h-full flex flex-col justify-between text-left p-4 shadow-md rounded-xl hover:shadow-lg">
                <div>
                    <img className="rounded-lg mb-3" src={thumbnail} alt="" />
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
                    <p className="text-sm font-normal mb-2">
                        <span className="text-base font-medium">Category:</span> {category}
                    </p>
                </div>
                <Link to={`/postDetails/${_id}`} className="mt-4">
                    <button className="btn w-full bg-gradient-to-bl to-blue-500 from-purple-500">
                        View Details
                    </button>
                </Link>
            </div>
        </Fade>
    );
};

export default VolunteerNeedsNow;
