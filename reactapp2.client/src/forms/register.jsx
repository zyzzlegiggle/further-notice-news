import { useState } from "react";
import Page from '../skeletons/page';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    console.log(res);

                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <Page addClass="flex flex-row">
            <section className="basis-2/5"></section>
            <section className="border rounded-md basis-1/5 p-4">
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
                            ,
                        </div>
                    </section>
                    <div className="text-center">
                        <input type="submit" value="Submit" className="cursor-pointer p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]" />
                    </div>
                </form>
            </section>
            <section className="basis-2/5"></section>
        </Page>
    );
}
export default Register;