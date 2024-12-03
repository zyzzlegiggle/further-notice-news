import { useEffect, useState } from "react";
import Notification from "../util/notification";
import { useNavigate } from "react-router";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

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
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                console.error("Unknown name form");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.error("Please enter a valid email address.");
            setNotificationMessage("Please enter a valid email address")
            setSuccessful(false);
            setProcessed(true);
        } else if (password !== confirmPassword) {
            setNotificationMessage("Password do not match");
            setSuccessful(false);
            setProcessed(true);
        } else {
            await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((res) => {
                    setProcessed(true);
                    if (res.ok) {
                        setNotificationMessage("Register Successful");
                        setSuccessful(true);
                        setTimeout(() => {
                            navigate("/login");
                        }, 3000); // 3 seconds
                    } else {
                        setNotificationMessage("Register Failed");
                        setSuccessful(false);
                    }
                })
                .catch((error) => {
                    setNotificationMessage("Error occurred during registration.");
                    setSuccessful(false);
                    console.error('error is:', error);
                });
        }
    }

    function handleClick() {
        setSuccessful(a => !a);
        setProcessed(true);
    }

    useEffect(() => {
        if (processed) {
            const timer = setTimeout(() => {
                setSuccessful(false);
                setProcessed(false);
            }, 3000); // currently 3 secs
            return () => clearTimeout(timer);
        }
    }, [processed]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
            {/* Toast Notification */}
            <Notification
                message={notificationMessage}
                isSuccessful={successful}
                isVisible={processed}
            />

            {/* Register Form */}
            <div className="p-8 bg-white shadow-lg border rounded-lg w-full max-w-sm">
                <h1 className="text-3xl text-center font-semibold mb-6">Register</h1>
                <form onSubmit={handleSubmit}>
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

                    <section className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </section>

                    <button
                        type="submit"
                        className="w-full p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]"
                    >
                        Submit
                    </button>
                </form>
                <button
                    onClick={handleClick}
                    className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
                >
                    Test Notification
                </button>
            </div>
        </section>
    );
}

export default Register;
