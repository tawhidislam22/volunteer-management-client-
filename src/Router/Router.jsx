import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Regsister/Register";
import AddVolunteerPost from "../Pages/AddVolunteerPost/AddVolunteerPost";
import VolunteerPostDetails from "../Pages/VolunteerPostDetails/VolunteerPostDetails";

import AllVoluteerNeedPosts from "../Pages/AllVoluteerNeedPosts/AllVoluteerNeedPosts";
import MyRequests from "../Pages/MyRequests/MyRequests";
import MyPosts from "../Pages/MyPosts/MyPosts";
import EditPost from "../Pages/MyPosts/EditPost";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<h2>Error Page</h2>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/allPosts',
          element:<AllVoluteerNeedPosts></AllVoluteerNeedPosts>
        },
        {
          path:'/addVolunteerPost',
          element:<AddVolunteerPost></AddVolunteerPost>
        },
        {
          path:'/postDetails/:id',
          element:<VolunteerPostDetails></VolunteerPostDetails>,
          loader:({params})=>fetch(`http://localhost:5000/volunteers/${params.id}`)
        },
        {
          path:'/myPosts',
          element:<MyPosts></MyPosts>
        },
        {
          path:'/myPosts/edit/:id',
          element:<EditPost></EditPost>
        },
        {
          path:'/myRequests',
          element:<MyRequests></MyRequests>
        }
        
      ]
    },
  ]);

  export default router;