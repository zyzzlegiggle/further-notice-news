
import { useNavigate } from "react-router";

const apiUrl = import.meta.env.VITE_APIURL;

function LogoutLink(props) {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = new URL("/logout", apiUrl);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
            credentials: 'include'

        })
            .then((data) => {
                if (data.ok) {
                    sessionStorage.setItem("isLoggedIn", false);
                    navigate("/login");
                }


            })
            .catch((error) => {
                console.error(error);
            })

    };

    return (
        <div className=" cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleSubmit}>
            {props.children}
        </div>
    );
}

export default LogoutLink;