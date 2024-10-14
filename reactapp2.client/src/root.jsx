import {
    Link,
    Outlet,
    Form,
    redirect,
} from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const query = formData.get("search");
    return redirect(`search/${query}`);
}

function Root() {

    return (
        <>
            <nav className="border-b">
                <ul>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/favorites"}>Favorites</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/entertainment"}>Entertainment</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/science"}>Science</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/business"}>Business</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/health"}>Health</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/sports"}>Sports</Link>
                    </li>
                    <li className="inline-block min-h-full p-2.5 border-r hover:bg-sky-400 hover:text-white">
                        <Link to={"/technology"}>Technology</Link>
                    </li>

                    {/* Search bar here */}
                    <li className="inline-block min-h-full pl-48">
                        <Form method="post">
                            <label id="site-search">Search News: </label>
                            <input
                                type="search"
                                id="site-search"
                                name="search"
                                className="border pl-2.5"
                            />
                            <button type="submit" className="ml-2 p-1.5 rounded-md hover:bg-sky-400 hover:text-white">Search</button>
                        </Form>
                    </li>

                </ul>
            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );

    
}

export default Root;