import Link from 'next/link';
import { Router } from 'next/router';
import {useState} from 'react';
import baseUrl from '../helpers/baseUrl';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userSignup = async (e) =>{
        e.preventDefault()
        const res = await fetch(`${baseUrl}/api/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        })

        const res2 = await res.json()
        if(res2.error){
            M.toast({ html: res2.error, classes: "red" })
        }else{
            M.toast({ html: res2.message, classes: "green" })
            router.push("/login");
        }
    }
    return (
        <div className="container scard card center-align">
       <h3>Sign Up</h3>
       <form onSubmit={(e)=>userSignup(e)} >
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="btn waves-effect waves-light" type="submit" >signup
                <i className="material-icons right">forward</i>
                </button>
                <h5> <Link href="/login"> Already have a account ? </Link></h5>
       </form>
        </div>
    )
}

export default Signup;