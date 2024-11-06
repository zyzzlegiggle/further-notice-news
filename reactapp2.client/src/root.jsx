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

    const navClasses = "inline-block rounded p-2.5 hover:bg-[#5271ff] hover:text-white";

    return (
        <>
            <nav className="container mx-auto px-16">
                <img className="size-32 object-contain inline-block mr-10" src="src/assets/news_logo.png" alt="news logo"></img>
                <Link to={"/"} className={navClasses}>Home</Link>
                <Link to={"/favorites"} className={navClasses}>Favorites</Link>
                <Link to={"/entertainment"} className={navClasses}>Entertainment</Link>
                <Link to={"/science"} className={navClasses}>Science</Link>
                <Link to={"/business"} className={navClasses}>Business</Link>
                <Link to={"/health"} className={navClasses}>Health</Link>
                <Link to={"/sports"} className={navClasses}>Sports</Link>
                <Link to={"/technology"} className={navClasses}>Technology</Link>
                

                {/* Search bar here */}
                <li className="inline-block min-h-full pl-16">
                    <Form method="post">
                        <input
                            type="search"
                            id="site-search"
                            name="search"
                            className="border p-1"
                        />
                        <button type="submit" className="ml-2 p-2.5 rounded-md hover:bg-[#5271ff] hover:text-white">Search</button>
                    </Form>
                </li>
            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );

    
}

export default Root;