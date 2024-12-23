import axios from "axios";
import { useState } from "react";
import VolunteerNeedsNow from "../Home/VolunteerNeedsNow";


const AllVoluteerNeedPosts = () => {
    const [allPosts,setAllPosts]=useState()
    axios.get('http://localhost:5000/volunteers')
    .then(res=>{
        setAllPosts(res.data)
    })
    .catch(err=>{
        console.log(err.message)
    })
    return (
        <div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {
                    allPosts?.map(post => <VolunteerNeedsNow key={post._id} post={post}></VolunteerNeedsNow>)
                }
            </div>
        </div>
    );
};

export default AllVoluteerNeedPosts;