import { Link, Outlet } from "react-router-dom";

function Nav() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Nav;