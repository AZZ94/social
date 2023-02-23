import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home user={props.user} />} />
            <Route path="/login" element={<Login setUser={props.setUser} user={props.user} />} />
            <Route path="/signup" element={<SignUp />} user={props.user} />
        </Routes>
    );
}

export default AppRoutes;