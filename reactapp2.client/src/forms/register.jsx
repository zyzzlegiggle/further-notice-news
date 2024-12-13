import { useEffect, useState } from "react";
import Notification from "../util/notification";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [loading, setLoading] = useState(false);
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

        setLoading(true);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setNotificationMessage("Please enter a valid email address");
            setSuccessful(false);
            setProcessed(true);
            setLoading(false);
            setTimeout(() => setProcessed(false), 1500);
        } else if (password !== confirmPassword) {
            setNotificationMessage("Passwords do not match");
            setSuccessful(false);
            setProcessed(true);
            setLoading(false);
            setTimeout(() => setProcessed(false), 1500);
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
                        console.log(res);
                        setNotificationMessage("Register Failed");
                        setSuccessful(false);
                        setLoading(false)
                    }
                })
                .catch((error) => {
                    setNotificationMessage(`Error occurred during registration: ${error}` );
                    setSuccessful(false);
                    setLoading(false);
                    setProcessed(true);
                    setTimeout(() => setProcessed(false), 1500);
                    console.error("Error:", error);
                });
        }
    }

    useEffect(() => {
        if (processed) {
            const timer = setTimeout(() => {
                setSuccessful(false);
                setProcessed(false);
            }, 3000); // currently 3 seconds
            return () => clearTimeout(timer);
        }
    }, [processed]);

    return (
        <section className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4">
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
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
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
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
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
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">
                            Confirm Password
                        </label>
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

                    <section className="mb-6 hover:text-blue-400">
                        <Link
                            to="/login"
                        >
                            Have an account?
                        </Link>
                    </section>

                    <button
                        type="submit"
                        className="w-full p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]"
                    >
                        {loading ?
                            <>
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </>
                            :
                            <>
                                Submit
                            </>
                        }
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Register;
