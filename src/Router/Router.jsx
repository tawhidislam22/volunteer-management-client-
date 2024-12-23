import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Regsister/Register";
import AddVolunteerPost from "../Pages/AddVolunteerPost/AddVolunteerPost";

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
          path:'/addVolunteerPost',
          element:<AddVolunteerPost></AddVolunteerPost>
        }
      ]
    },
  ]);

  export default router;