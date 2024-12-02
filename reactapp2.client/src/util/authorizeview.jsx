import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";


const userContext = createContext({});
export function AuthorizeView(props) {
    let navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    let emptyuser = { email: "" };
    const [user, setUser] = useState(emptyuser);

    useEffect(() => {
        // get cookie
        let retryCount = 0;
        let maxRetry = 10;
        const delay = 1000;

        // define a delay function that returns a promise
        function wait(delay) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }

        // define a fetch function that retries until status 200 or 401
        async function fetchRetry(url, options) {
            try {
                let response = await fetch(url, options);

                if (response.status == 200) {
                    console.log("Authorized");
                    setAuthorized(true);
                    localStorage.setItem('isLoggedIn', true);
                    let data = await response.json();
                    setUser({ email: data.email });
                } else if (response.status == 401) {
                    console.log("unauthorized");
                } else {
                    console.error("error + " + response.status)
                }
            } catch (e) {
                console.log("error while fetching. retry count: " + retryCount);
                retryCount += 1;
                if (retryCount > maxRetry) {
                    throw e;
                } else {
                    //keep trying
                    await wait(delay);
                    return fetchRetry(url, options)
                }
            }
        }

        // call fetch
        fetchRetry("/pingauth", { method: "GET" })
            .catch((e) => console.error("Error fetching: ", e))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading && !authorized) {
            navigate("/register");
        }
    }, [loading, authorized, navigate]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (authorized && !loading) {
        return (
            <>
                <userContext.Provider value={user}>{props.children}</userContext.Provider>
            </>
        )
    }
}

export function GetUser(props) {
    // get email from context
    const user = useContext(userContext);

    if (props.value == "email") {
        return <>{user.email}</>
    }

    return null;
}
