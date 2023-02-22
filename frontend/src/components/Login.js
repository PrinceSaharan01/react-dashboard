import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    useEffect(()=>{
        const authenticate = localStorage.getItem('user');
        if(authenticate){
            navigate('/')
        }
    },[])

    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const navigate = useNavigate();

    const login = async () => {
        let result = await fetch('http://localhost:5500/login', {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "content-type": "application/json"
            }
        })
        result = await result.json();
        console.log(result);

        if (result.token) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.token));
            navigate('/')
        } else {
            alert("Please Enter Correct Details")
        }

    }
    return (
        <div>
            <h1>Login Page</h1>
            <input className="inputBox" value={email} onChange={(e) => { setEmail(e.target.value) }} type={"text"} placeholder="UserName"></input><br></br><br></br>
            <input className="inputBox" value={password} onChange={(e) => { setPass(e.target.value) }} type="password" placeholder="Password"></input><br></br><br></br>
            <button onClick={login} className="btn" type="submit">Login</button>
        </div>
    )
}
export default Login; 