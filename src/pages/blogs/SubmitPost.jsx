import Swal from "sweetalert2";

const SubmitPost = () => {

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        const newPost = Object.fromEntries(formData.entries());
        console.log(newPost);

        //send to db
        fetch('http://localhost:3000/blogs', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                 Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Post Submitted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        })
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Submit a New Blog Post</h2>
            <form onSubmit={handleSubmit}
            className="space-y-6">
                {/* Title */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Post Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter blog title"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                 {/* Meta Description */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Meta Description <i>(50 to 160 characters only)</i></span>
                    </label>
                    <textarea
                        name="meta_description"
                        placeholder="Write meta description here"
                        className="textarea textarea-bordered h-20  w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                        rows="4"
                    ></textarea>
                </div>

                {/* Description */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Post Description</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Write post description here..."
                        className="textarea textarea-bordered h-50  w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                        rows="4"
                    ></textarea>
                </div>
                 {/* Image URL */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Thumb Image URL</span>
                    </label>
                    <input
                        type="text"
                        name="image"
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
                {/* Author */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Author Name</span>
                    </label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Author name"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>

               

                {/* Submit Button */}
                <button className="btn btn-secondary w-full rounded-full">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default SubmitPost;