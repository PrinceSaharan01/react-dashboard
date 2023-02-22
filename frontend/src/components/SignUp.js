import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const navigate = useNavigate();

useEffect(()=>{
    const authenticate = localStorage.getItem('user');
    if(authenticate){
        navigate('/')
    }
},[])


    const collectData = async () => {
        console.log(`
        Name:${name}
        Email:${email}`)

        let result = await fetch("http://localhost:5500/signup", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                "content-type": "application/json"
            }
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.token));
        navigate('/')
    }

    return (
        <div className="register">
            <h1>Sign Up</h1>

            <input className="inputBox" type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"></input><br></br><br></br>
            <input className="inputBox" type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"></input><br></br><br></br>
            <input className="inputBox" type='password' value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"></input><br></br><br></br>
            <button onClick={collectData} className="btn" type="submit">SignUp</button>
        </div>
    )
}
export default SignUp;
