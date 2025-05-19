import { useLoaderData } from "react-router";

const BlogDetails = () => {
    const blogs = useLoaderData();
    const {_id, title,description, author, image } = blogs
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-2 text-neutral">{title}</h1>
            <p className="text-sm text-gray-500 mb-6">By {author}</p>
            <div className="prose max-w-none text-neutral-content">
                <p>{description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a nunc vel odio laoreet accumsan. Maecenas eu felis nec justo lacinia suscipit.</p>
                <p>Ut vehicula risus sit amet diam tincidunt, at feugiat erat fermentum. Aliquam erat volutpat. Integer ac justo sed purus fermentum tempor.</p>
            </div>
        </div>
    );
};

export default BlogDetails;