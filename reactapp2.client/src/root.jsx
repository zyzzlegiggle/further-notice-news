import {
    Link,
    Outlet,
    Form,
    redirect,
} from "react-router-dom";

import { useLocation } from 'react-router';
import { useState } from "react";
import { useEffect } from "react";

export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("search");
    return redirect(`search/${query}`);
}

function Root() {
    const [userDropdown, setUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const currentPath = useLocation().pathname;

    const navClasses = (path) => `transition duration-200 ease-in-out mr-2 rounded block py-2 px-3 text-gray-900 hover:bg-[#5271ff] hover:text-white ${currentPath === path ? "bg-[#5271ff] text-white" : ""}`;

    const paths = [
        { name: "Home", path: "/" },
        { name: "Entertainment", path: "/entertainment" },
        { name: "Science", path: "/science" },
        { name: "Business", path: "/business" },
        { name: "Health", path: "/health" },
        { name: "Sports", path: "/sports" },
        { name: "Technology", path: "/technology" },
    ];

    const toggleDropdown = () => {
        setUserDropdown((a) => !a);
    };

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn")) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    })
    return (
        <>
            <nav className="bg-white flex items-center py-4 px-4 shadow-md">
                <div className="flex items-center">
                    <img
                        className="w-32 h-32 mr-10 object-contain"
                        src="src/assets/news_logo.png"
                        alt="news logo"
                    />
                    <ul className="flex space-x-4 font-medium">
                        {paths.map(({ name, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className="text-gray-700 hover:text-[#5271ff] active:text-[#5271ff]"
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative">
                        <button
                            className="rounded-full bg-[#5271ff] px-3 py-2 text-white hover:bg-blue-700"
                            onClick={toggleDropdown}
                        >
                            <i className="fa-solid fa-user"></i>
                        </button>

                        {userDropdown && (
                            <>
                                {isLoggedIn ? (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <Link
                                            to="/bookmarks"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Your Bookmarks
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="ml-4 flex items-center">
                        <form method="post" className="flex">
                            <input
                                type="search"
                                id="site-search"
                                name="search"
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="ml-2 px-3 py-2 rounded-md bg-[#5271ff] text-white hover:bg-blue-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

export default Root;
