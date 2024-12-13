import {
    Link,
    Outlet,
    Form,
    redirect,
} from "react-router-dom";

import { useLocation } from 'react-router';
import { useRef, useState } from "react";
import { useEffect } from "react";
import LogoutLink from "./util/logoutlink";

export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("search");
    console.log(query);
    return redirect(`search/${query}`);
}

function Root() {
    const [userDropdown, setUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const currentPath = useLocation().pathname;
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        const checkSessionStorage = () => {
            const storageLogged = sessionStorage.getItem("isLoggedIn") === "true";
            console.log(storageLogged);
            if (isLoggedIn !== storageLogged) {
                setIsLoggedIn(storageLogged);

            }

            const user = sessionStorage.getItem("currentUser") || "";
            if (currentUser !== user) {
                setCurrentUser(user);
            }
        };

        const interval = setInterval(checkSessionStorage, 1000);

        return () => clearInterval(interval);

    }, [isLoggedIn, currentUser]);

    //handle dropdown click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })
    const toggleDropdown = () => {
        setUserDropdown((a) => !a);
    };

    return (
        <>
            <nav className="bg-white flex items-center py-2 px-4 shadow-md sticky top-0 z-50">
                <div className="flex items-center">
                    <img
                        className="w-32 h-32 mr-10 object-contain"
                        src="src/assets/news_logo.png"
                        alt="news logo"
                    />
                    <ul className="flex space-x-4 font-medium">
                        {paths.map(({ name, path }) => (
                            <li key={path}
                                className="text-gray-700 hover:text-[#5271ff] active:text-[#5271ff]"
                            >
                                <Link
                                    to={isLoggedIn ? path : "#"}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="rounded-full bg-[#5271ff] px-3 py-2 text-white hover:bg-blue-700"
                            onClick={toggleDropdown}
                        >
                            <i className="fa-solid fa-user"></i>
                        </button>

                        {userDropdown && (
                            <>
                                {isLoggedIn ? (
                                    <>
                                        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                                            <div
                                                className="block px-4 py-2 text-gray-700"
                                                
                                            >
                                                {currentUser}
                                            </div>
                                            <Link
                                                to="/bookmarks"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={toggleDropdown}
                                            >
                                                Your Bookmarks
                                            </Link>
                                            <div onClick={toggleDropdown}>
                                                <LogoutLink>Logout</LogoutLink>

                                            </div>

                                        </div>
                                    </>
                                    

                                    
                                ) : (
                                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <Link
                                                to="/register"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={toggleDropdown}
                                        >
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={toggleDropdown}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="ml-4 flex items-center">
                        <Form method="post" className="flex">
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
                        </Form>
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
