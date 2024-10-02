import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Home from "./home"
import ErrorPage from "./error-page"
import Root, { action as rootAction } from "./root"
import Favorite from "./favorites"
import Search, { loader as searchLoader } from "./search"
import Entertainment from "./entertainment"
import Science from "./science"
import Business from "./business"
import Health from "./health"
import Sports from "./sports"
import Technology from "./technology"

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
