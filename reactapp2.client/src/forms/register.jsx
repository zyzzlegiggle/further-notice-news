import { useEffect, useState } from "react";
import Page from '../skeletons/page';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [processed, setProcessed] = useState(false);
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
        } else if (password !== confirmPassword) {
            console.error("Password do not match");
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
                        setSuccessful(true);
                    }
                })
                .catch((error) => {
                    console.error('error is:',error);
                })
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
    }, [processed])
    console.log("register");
    return (
        <section className="container mx-auto py-8 px-16">
            
            <div className="flex flex-row" >
                <section className="basis-2/5"></section>
                <section className="basis-1/5 ">
                    
                    <div id="toast-success" className={`${processed ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-4"} transition-all duration-500 ease-in-out flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
                        <div className={` ${successful ? "text-green-500 bg-green-100  dark:bg-green-800 dark:text-green-200" : "text-red-500 bg-red-100 dark:text-red-200 dark:bg-red-800"} inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg`}>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d={successful ?
                                    "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" :
                                    "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
                                } />
                            </svg>
                            <span className="sr-only">{successful ? "Check icon" : "Error icon"}</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{successful ? "Register Successful" : "Register Failed"}</div>
                    </div>
                    <div className="p-4 shadow-xl border rounded-md mb-8">
                        <h1 className="text-3xl text-center font-semibold">Register</h1>
                        <form onSubmit={handleSubmit}>
                            <section className="mb-4">
                                <div>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={handleChange}
                                        className="border"
                                        required
                                    />
                                </div>
                            </section>

                            <section className="mb-4">
                                <div>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={handleChange}
                                        className="border"
                                        required
                                    />
                                </div>
                            </section>

                            <section className="mb-4">
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        className="border"
                                        required
                                    />
                                </div>
                            </section>
                            <div className="text-center">
                                <input type="submit" value="Submit" className="cursor-pointer p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]" />
                            </div>
                        </form>

                    </div>
                    <button onClick={handleClick}>
                        click test
                    </button>
                    
                </section>
                <section className="basis-2/5"></section>
            </div>
        </section>
        
    );
}
export default Register;