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
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
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
          element:<PrivateRoute><AddVolunteerPost></AddVolunteerPost></PrivateRoute>
        },
        {
          path:'/postDetails/:id',
          element:<PrivateRoute><VolunteerPostDetails></VolunteerPostDetails></PrivateRoute>,
          loader:({params})=>fetch(`https://volunteer-management-server-nu.vercel.app/volunteers/${params.id}`)
        },
        {
          path:'/myPosts',
          element:<PrivateRoute><MyPosts></MyPosts></PrivateRoute>
        },
        {
          path:'/myPosts/edit/:id',
          element:<PrivateRoute><EditPost></EditPost></PrivateRoute>
        },
        {
          path:'/myRequests',
          element:<PrivateRoute><MyRequests></MyRequests></PrivateRoute>
        }
        
      ]
    },
  ]);

  export default router;