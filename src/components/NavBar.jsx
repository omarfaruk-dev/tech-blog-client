import { Link } from "react-router";
import { FaBars, FaBookReader } from "react-icons/fa";
import { PiNotePencilFill } from "react-icons/pi";

export default function Navbar() {
    const links =
        <>
            <Link to="/blogs" className="hover:text-primary flex items-center gap-1"><FaBookReader /> Read</Link>
            <Link to="/submit-post" className="hover:text-primary flex items-center gap-1"><PiNotePencilFill /> Write</Link>
            <Link to="/signin" className="hover:text-primary">Signin</Link>
            <Link to="/get-started">
                <button className="btn btn-secondary text-primary rounded-full px-4">Get started</button>
            </Link>

        </>


    return (
        <div className="navbar shadow-md">
            <div className="navbar bg-base-100 px-4 w-7xl mx-auto">
                <div className="flex-1">
                    <Link to="/" className="flex items-center text-xl font-bold text-neutral">
                        <img className="w-12" src="/logo.png" alt="" /> Tech Blog
                    </Link>
                </div>

                <div className="hidden lg:flex gap-6 items-center text-sm">
                    {links}
                </div>

                {/* Mobile menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost">
                        <FaBars size={20} />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {links}

                    </ul>
                </div>
            </div>
        </div>
    );
}
