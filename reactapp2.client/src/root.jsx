import {
    Link,
    Outlet,
    Form,
    redirect,
} from "react-router-dom";

import { useLocation } from 'react-router';
import { useState } from "react";

export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("search");
    return redirect(`search/${query}`);
}

function Root() {
    const [userDropdown, setUserDropdown] = useState(false);

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
    ]

    const toggleDropdown = () => {
        setUserDropdown(a => !a);
    }

    return (
        <>
            <nav className="container mx-auto items-center flex flex-row">
                <img className="size-32 object-contain inline-block mr-10" src="src/assets/news_logo.png" alt="news logo"></img>

                 {paths.map(({ name, path }) => (
                    <Link key={path} to={path} className={navClasses(path)}>
                            {name}
                    </Link>
                 ))}

                <div className="relative">
                    <button
                        className="rounded-full bg-[#5271ff]"
                        onClick={toggleDropdown}
                    >
                        <i className="fa-solid fa-user p-2" style={{ color: "#ffffff", }}></i>

                    </button>

                    {userDropdown && (
                        <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                            <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Register
                            </Link>
                            <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
                
                {/* Search bar here */}
                <div className="min-h-full">
                    <Form method="post">
                        <input
                            type="search"
                            id="site-search"
                            name="search"
                            className="border p-1"
                        />
                        <button type="submit" className="ml-2 p-2.5 rounded-md hover:bg-[#5271ff] hover:text-white">Search</button>
                    </Form>
                </div>


            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );

    
}

export default Root;