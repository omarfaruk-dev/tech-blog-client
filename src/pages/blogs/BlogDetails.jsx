import { FaBlog } from "react-icons/fa";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { Link, useLoaderData } from "react-router";

const BlogDetails = () => {
    const blogs = useLoaderData();
    const {_id, title,description, author, image } = blogs
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-left mt-10 mb-10"><Link className="btn btn-secondary text-white rounded-3xl" to='/blogs'><TbArrowBackUpDouble size={20} /> Back to blog</Link></div>
            <img
                src={image}
                alt={title}
                className="w-full h-100 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-2 share-tech-font">{title}</h1>
            <p className="text-sm text-gray-500 mb-6">By {author}</p>
            <div className="text-primary">
                <p>{description}</p><br />
                <p>{description}</p><br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc vel odio laoreet accumsan. Maecenas eu felis nec justo lacinia suscipit.</p>
                <p>Ut vehicula risus sit amet diam tincidunt, at feugiat erat fermentum. Aliquam erat volutpat. Integer ac justo sed purus fermentum tempor.</p>
            </div>
            <div className="text-center mt-10"><Link to='/blogs'  className="btn btn-secondary text-primary rounded-3xl text-white"><FaBlog/> View All Post</Link></div>
        </div>
    );
};

export default BlogDetails;