import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./news_pages/home"
import ErrorPage from "./error-page"
import Root, { action as rootAction } from "./root"
import Favorite from "./news_pages/favorites"
import Search, { loader as searchLoader } from "./search"
import Entertainment from "./news_pages/entertainment"
import Science from "./news_pages/science"
import Business from "./news_pages/business"
import Health from "./news_pages/health"
import Sports from "./news_pages/sports"
import Technology from "./news_pages/technology"
import Register from "./forms/register"
import Login from "./forms/login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        action: rootAction,
        children: [
            {
                index: true, // for home page
                element: <Home />,
            },
            {
                path: "favorites",
                element: <Favorite />
            },
            {
                path: "entertainment",
                element: <Entertainment />
            },
            {
                path: "science",
                element: <Science />
            },
            {
                path: "business",
                element: <Business />
            },
            {
                path: "health",
                element: <Health />
            },
            {
                path: "sports",
                element: <Sports />
            },
            {
                path: "technology",
                element: <Technology />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "Login",
                element: <Login />
            },
            {
                path: "search/:query",
                element: <Search />,
                loader: searchLoader,
            },
        ]
    },

])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
