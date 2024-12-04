
import { useNavigate } from "react-router";

function LogoutLink(props) {

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""

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
        <>
            <a href="#" onClick={handleSubmit}>{props.children}</a>
        </>
    );
}

export default LogoutLink;