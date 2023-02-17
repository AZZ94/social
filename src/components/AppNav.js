import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import './AppNav.css';

const AppNav = (props) => {

    // const [isLoggedin, setIsLoggedin] = useState(false);



    const handleLogout = (e) => {
        e.preventDefault();

        axios
            .post("http://akademia108.pl/api/social-app/user/logout")
            .then((res) => {

                if (res.data.message) {
                    props.setUser(null);

                    localStorage.setItem('user', null);
                }
            })
    };

    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                {!props.user && <li>
                    {/* ??? */}
                    <Link to="/login">Log in</Link>
                </li>}

                {!props.user && <li>
                    <Link to="/signup">Sign up</Link>
                </li>}

                {props.user && <li>
                    <Link to="/"
                        onClick={handleLogout}>Log out</Link>
                </li>
                }


                {/* // ? */}
            </ul>

        </nav>
    );
}

export default AppNav