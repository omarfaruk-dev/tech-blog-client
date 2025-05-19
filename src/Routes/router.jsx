import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import Blogs from "../pages/blogs/Blogs";
import BlogDetails from "../pages/blogs/BlogDetails";
import SubmitPost from "../pages/blogs/SubmitPost";
import SignIn from "../pages/users/SignIn";
import SignUp from "../pages/users/SignUp";
import Spinner from "../components/ui/Spinner";


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: HomeLayout,
            },
            {
                path: '/signin',
                Component: SignIn,
            },
            {
                path: '/signup',
                Component: SignUp,
            },
            {
                path: 'submit-post',
                element: <SubmitPost/>
            },
            {
                path: '/blogs',  
                hydrateFallbackElement: <Spinner/>,
                // loader: () => fetch('http://localhost:3000/blogs'),
                element: <Blogs/>         
            },
            {
                path: 'blog-details/:id',
                loader: ({params}) => fetch(`http://localhost:3000/blogs/${params.id}`),
                element: <BlogDetails/>
            },
            {
                path: '*',
                Component: ErrorPage
            }
        ]
    }
])


export default router;