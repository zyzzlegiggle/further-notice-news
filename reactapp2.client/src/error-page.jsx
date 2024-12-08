import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        },3000)
    })

    return (
        <div id="error-page" className="container mx-auto py-8 px-16">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}