import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const authenticate = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')

    }
    return (
        <div>
<img alt="logo" className="logo" src="logoshop.png"></img>
            {/* <li>{authenticate? <Link onClick={logout} to= '/signup'>Logout</Link>:<Link to="/signup">SignUp</Link>}</li>   // handles logout and signin
                <li><Link to='/login'>Login</Link></li> */}
            {
                authenticate ? <ul className="nav-ul nav-left">
                    <li><Link to='/'>Product</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    {/* <li><Link to='/update'>Update Product</Link></li> */}
                    <li><Link to='/profile'>Profile</Link></li>
                    <Link onClick={logout} to='/signup'>Logout :- {JSON.parse(authenticate).name} </Link>
                </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to='/login'>Login</Link></li>

                    </ul>
            }

        </div>
    )
}

export default Nav;




