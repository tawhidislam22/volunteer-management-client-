import { Link } from "react-router-dom";
import 'animate.css';
import { Fade } from "react-awesome-reveal";

const VolunteerNeedsNow = ({post}) => {
    const {_id,thumbnail,title,category,deadline}=post
    return (
        <Fade>
        <div className="border text-left p-4 shadow-md rounded-xl hover:shadow-lg">
            <img className="rounded-lg mb-3" src={thumbnail} alt="" />
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-base font-normal mb-2"><span className="text-lg font-medium">Category:</span> {category}</p>
            <p className="text-base font-normal mb-2"><span className="text-lg font-medium">Deadline:</span> {deadline}</p>
            <Link to={`/postDetails/${_id}`}><button className="btn w-full bg-gradient-to-bl to-blue-500  from-purple-500 animate__animated animate__bounce animate__pulse animate__infinite">View Details</button></Link>
        </div>
        </Fade>
    );
};

export default VolunteerNeedsNow;