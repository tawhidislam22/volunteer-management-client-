import axios from "axios";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import VolunteerNeedsNow from "./VolunteerNeedsNow";

const Home = () => {
    const [allPosts,setAllPosts]=useState()
    const [show,setShow]=useState(false)
    useEffect(()=>{
        axios.get('http://localhost:5000/volunteers')
    .then(res=>{
        setAllPosts(res.data)
    })
    .catch(err=>{
        console.log(err.message)
    })
    },[])
    let posts=allPosts.slice(0,6)
    const handleLessPosts=()=>{
        const posts=allPosts.slice(0,6)
        setShow(false)
    }
    const handleAllPosts=()=>{

    }
    return (
        <div>
            <div className="bg-banner-Image bg-cover bg-center w-full ">
            <div className=" bg-black bg-opacity-75">
            <Banner></Banner>
            </div>
            </div>
            <div className="text-center my-8">
                <h2 className="text-2xl mb-3">All Volunteer Posts</h2>
                <p className="w-3/4 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam cumque ullam provident facilis, illo delectus aliquam rerum aliquid est eius? Iste dolores excepturi earum culpa. Nisi qui enim beatae voluptate.</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {
                    posts?.map(post=><VolunteerNeedsNow key={post._id} post={post}></VolunteerNeedsNow>)
                }
                </div>
                <div>
                    {
                        show?<><button className="btn" onClick={handleAllPosts}>Show Less</button></>:<><button className="btn" onClick={()=>setShow(true)}>Show More</button></>
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Home;