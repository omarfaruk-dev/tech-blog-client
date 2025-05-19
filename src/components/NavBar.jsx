import { Link, NavLink } from "react-router";
import { FaBars, FaBlog, FaBookReader } from "react-icons/fa";
import { PiNotePencilFill } from "react-icons/pi";

export default function Navbar() {
    const links =
        <>
            <NavLink to="/blogs" className="hover:text-primary flex items-center gap-1"><FaBookReader /> Read</NavLink>
            <NavLink to="/submit-post" className="hover:text-primary flex items-center gap-1"><PiNotePencilFill /> Write</NavLink>
            <NavLink to="/signin" className="hover:text-primary">Signin</NavLink>
            <NavLink to="/signup">
                <button className="btn btn-secondary text-white rounded-full px-4">Get started</button>
            </NavLink>

        </>

    return (
        <div className="navbar border-b border-secondary">
            <div className="navbar bg-base-100 px-4 w-7xl mx-auto">
                <div className="flex-1">
                    <div className="flex items-center text-xl font-bold text-neutral">
                        <Link className="flex items-center gap-1 share-tech-font text-3xl"><FaBlog size={30} className="text-secondary"/>Tech Blog</Link>
                    </div>
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
