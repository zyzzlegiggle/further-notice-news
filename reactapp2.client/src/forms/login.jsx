import { useState } from "react";
import Page from "../skeletons/page";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberMe] = useState(false);

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
            console.error("Please fill out the forms");



        } else {
            let url = "";

            if (rememberme) {
                url = "/login?useCookies=true";
            } else {
                url = "/login?useSessionCookies=true";
            }

            await fetch(url, {
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
                if (res.ok) {
                    console.log("login success");
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    async function handleClick() {
        try {
            const res = await fetch("/pingauth", {
                method: "GET",
            });
            if (res.status == 200) {
                console.log("authorized");
                let data = await res.json();
                console.log(data);
            }
        } catch (e) {
            console.error('error:' + e);
        }
        


    }
    
    return (
        <Page addClass="flex flex-row">
            <section className="basis-2/5"></section>
            <section className="border rounded-md basis-1/5 p-4">
                <h1 className="text-3xl text-center font-semibold">Login</h1>
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
                            <input
                                type="checkbox"
                                name="rememberme"
                                id="rememberme"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="rememberme">Remember Me</label>
                        </div>
                    </section>
                    <div className="text-center">
                        <input type="submit" value="Submit" className="cursor-pointer p-2.5 rounded-md bg-[#5271ff] text-white hover:bg-[#4964e3]" />
                    </div>
                </form>
            </section>
            <section className="basis-2/5"></section>
            <button onClick={handleClick}>click me pingauth</button>
        </Page>
    );
}

export default Login;