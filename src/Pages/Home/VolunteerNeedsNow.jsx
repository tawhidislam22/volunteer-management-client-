import { Link } from "react-router-dom";


const VolunteerNeedsNow = ({post}) => {
    const {_id,thumbnail,title,category,deadline}=post
    return (
        <div className="border p-4 shadow-md rounded-lg hover:shadow-lg">
            <img src={thumbnail} alt="" />
            <h2>{title}</h2>
            <p>Category: {category}</p>
            <p>Deadline: {deadline}</p>
            <Link to={`/postDetails/${_id}`}><button className="btn w-full bg-gradient-to-bl to-blue-500  from-purple-500">View Details</button></Link>
        </div>
    );
};

export default VolunteerNeedsNow;