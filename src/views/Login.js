import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Login = (props) => {

    // dane z formularza przechowujemy w stanie, potem wracaja do atrybutu value w form
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [loginMessage, setLoginMessage] = useState('')

    // funkcja aktualizujaca stan
    const handleInputChange = (e) => {
        // console.log(e.target.value);

        // obiekt wywolujacy zdarzenie przypisujemy do stalej
        const target = e.target;
        const name = target.name;

        // aktualizacja obiektu:
        setFormData({
            ...formData,
            [name]: target.value,

            // jak to dziala z password?
            // uzupelnia password mimo tego, ze jest name
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            username: formData.username,
            password: formData.password
        };

        axios.post("https://akademia108.pl/api/social-app/user/login", JSON.stringify(user))
            .then((res) => {
                // console.log(res.data);

                if (Array.isArray(res.data.username)) {
                    setLoginMessage(res.data.username[0])
                } else if (Array.isArray(res.data.password)) {
                    setLoginMessage(res.data.password[0])
                } else if (res.data.error) {
                    setLoginMessage('Incorrect login/password')
                } else {
                    setLoginMessage("");
      
                    // wstawianie uzytkownika do stanu po zalogowaniu
                    props.setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
                // test na tablicowosc


            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="login">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {loginMessage && <h2>{loginMessage}</h2>}
                {/* jak to dziala z tym wyswietlaniem i nie wyswietlaniem ?  */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange} />

                <input type="text"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange} />
                <button className="btn">Log in</button>
            </form>
        </div>
    );
};

export default Login