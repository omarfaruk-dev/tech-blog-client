import { Link } from "react-router";
import heroImg from '../assets/blog.svg'
const Hero = () => {
  return (
    <div className="hero min-h-[calc(100vh-149px)] bg-base-100 px-4 lg:px-24 py-12">
      <div className="hero-content max-w-5xl mx-auto flex-col lg:flex-row-reverse gap-12">
        {/* image*/}
        <div className="flex-1 flex flex-col items-center lg:items-end gap-6">
            <img  src={heroImg} alt="" />
        </div>

        {/* Text Side (Left on large screens) */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral">
            Human <br />
            <span className="text-neutral">stories & ideas</span>
          </h1>
          <p className="py-6 text-lg ">
            A place to read, write, and deepen your understanding.
          </p>
          <Link to='/blogs' className="btn btn-neutral rounded-full text-base px-6">
            Start reading
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
