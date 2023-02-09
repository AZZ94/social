import {Link } from "react-router-dom";
import './AppNav.css';

const AppNav = () => {
    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Log in</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav;