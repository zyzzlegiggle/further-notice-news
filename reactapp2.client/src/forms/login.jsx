import { useState } from "react";
import { useNavigate } from "react-router";
import Notification from "../util/notification";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberMe] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [processed, setProcessed] = useState(false);

    let navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "rememberme":
                setRememberMe(e.target.checked);
                break;
            default:
                console.error("Unknown name form");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            setNotificationMessage("Please fill out all the fields.");
            setSuccessful(false);
            setProcessed(true);
        } else {
            const url = rememberme
                ? "/login?useCookies=true"
                : "/login?useSessionCookies=true";

            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then((res) => {
                    if (res.ok) {
                        setNotificationMessage("Login Successful!");
                        setSuccessful(true);
                        setProcessed(true);
                        setTimeout(() => navigate("/"), 3000); // Wait for 3 seconds before navigation
                    } else {
                        setNotificationMessage("Login Failed. Please try again.");
                        setSuccessful(false);
                        setProcessed(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setNotificationMessage("An error occurred. Please try again.");
                    setSuccessful(false);
                    setProcessed(true);
                });
        }
    }

    return (
        <section className="min-h-screen flex items-start justify-center bg-gray-100 py-8 px-4">
            {/* Notification Section */}
            <Notification
                message={notificationMessage}
                isSuccessful={successful}
                isVisible={processed}
            />

            {/* Login Form */}
            <div className="p-8 bg-white shadow-lg border rounded-lg w-full max-w-sm mt-16">
                <h1 className="text-3xl text-center font-semibold mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <section className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </section>

                    {/* Password Input */}
                    <section className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </section>

                    {/* Remember Me Checkbox */}
                    <section className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            name="rememberme"
                            id="rememberme"
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="rememberme" className="text-sm">Remember Me</label>
                    </section>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );



}

export default Login;
