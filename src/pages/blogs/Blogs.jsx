import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
// const blogData = [
//     {
//         id: 1,
//         title: "The Future of AI in Daily Life",
//         description: "How artificial intelligence is shaping the tools we use every day.",
//         author: "John Doe",
//         image: "https://source.unsplash.com/600x400/?ai,technology",
//     },
//     {
//         id: 2,
//         title: "React vs. Vue: A Developer’s Guide",
//         description: "Which frontend framework should you choose in 2025?",
//         author: "Jane Smith",
//         image: "https://source.unsplash.com/600x400/?code,react",
//     },
//     {
//         id: 3,
//         title: "Top 10 VS Code Extensions",
//         description: "Boost your productivity with these must-have extensions.",
//         author: "Alex Lee",
//         image: "https://source.unsplash.com/600x400/?editor,code",
//     },
//     // Add more blog objects as needed
// ];

const Blogs = () => {
    // const blogsData = useLoaderData();
    // const { _id } = blogsData;

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
    fetch(`http://localhost:3000/blogs?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [search]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Blogs</h2>
            {/* Search Input */}
            <form 
            onChange={(e) => setSearch(e.target.value)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    className="input input-bordered w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button 
                className="btn btn-secondary text-white rounded-3xl w-full sm:w-auto">Search</button>
            </form>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <div key={blog.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                        <figure>
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title text-2xl share-tech-font">{blog.title}</h3>
                            <p className="text-sm text-primary">{blog.meta_description}</p>
                            <div className="mt-4 text-sm text-gray-500">By {blog.author}</div>
                            <div className="mt-2">
                                <Link to={`/blog-details/${blog._id}`} className="text-secondary font-medium">
                                    Read more →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;