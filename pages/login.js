import Link from 'next/link';
import { useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const res2 = await res.json()
        if (res2.error) {
            M.toast({ html: res2.error, classes: "red" })
        } else {
            cookie.set("token", res2.token);
            cookie.set("user", res2.user);
            router.push('/account');
            M.toast({ html: res2.message, classes: "green" });
        }
    }

    return (
        <div className="container scard card center-align">
            <h3>Login</h3>
            <form onSubmit={(e) => userLogin(e)}>
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light" type="submit" >login
                <i className="material-icons right">forward</i>
                </button>
                <h5> <Link href="/signup"> Don't have a account ?</Link></h5>
            </form>
        </div>
    )
}


export default Login;