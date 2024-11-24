import {
    Link,
    Outlet,
    Form,
    redirect,
} from "react-router-dom";

import { useLocation } from 'react-router';

export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("search");
    return redirect(`search/${query}`);
}

function Root() {

    const currentPath = useLocation().pathname;

    const navClasses = (path) => `rounded mr-2 p-2.5 hover:bg-[#5271ff] hover:text-white ${currentPath === path ? "bg-[#5271ff] text-white" : ""}`;

    const paths = [
        { name: "Home", path: "/" },
        { name: "Favorites", path: "/favorites" },
        { name: "Entertainment", path: "/entertainment" },
        { name: "Science", path: "/science" },
        { name: "Business", path: "/business" },
        { name: "Health", path: "/health" },
        { name: "Sports", path: "/sports" },
        { name: "Technology", path: "/technology" },
    ]

    return (
        <>
            <nav className="container mx-auto px-16 items-center flex flex-row">
                <img className="size-32 object-contain inline-block mr-10" src="src/assets/news_logo.png" alt="news logo"></img>

                {paths.map(({ name, path }) => (
                    <Link key={path} to={path} className={navClasses(path)}>
                        {name}
                    </Link>
                ))}

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