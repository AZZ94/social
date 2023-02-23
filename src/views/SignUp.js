import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import './SignUp.css';

const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    // stan dla bledow
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [signUpMessage, setSignUpMessage] = useState('');

    const [signUpDone, setSignUpDone] = useState(false);

    // wartosci logiczne - czy bledy sa czy ich nie ma
    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false,
        };

        // username
        // czy nazwa uzytkownika ma przynajmniej 4 znaki:
        if (formData.username.trim().length < 4) {
            // nie ma dzialac
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: 'Username must be at least 4 characters long' }
            });
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: 'Username cannot include empty characters' }
            });
        } else {
            validationErrors.username = false;
        };


        // email
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return { ...prevErrors, email: 'Not a valid e-mail address' }
            });
        } else {
            validationErrors.email = false;
        };

        // password:
        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: 'Password must be at least 6 characters long' }
            });
        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: 'Password cannot include empty characters' };
            });
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: 'Password must include special characters' }
            });
        } else {
            validationErrors.password = false;
        };


        // confirm:
        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors(prevErrors => {
                return { ...prevErrors, confirmPassword: 'Passwords do not match' }
            });
        } else {
            validationErrors.confirmPassword = false;
        };



        // jezeli przynajmniej jedno z pol bedzie mialo wartosc true - czyli bedzie blad
        return (!validationErrors.username && !validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword)
        // zwracamy odwrotnosc prawdy czyli falsz
    };




    const handleInputChange = (e) => {
        // analogicznie jak w login
        const target = e.target;
        const name = target.name;

        // aktualizacja obiektu:
        setFormData({
            ...formData,
            [name]: target.value,

        })
    };

    // walidacja - przy probie wyslania formularza:
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return
        }
        // jezeli validate zwroci falsz przerwij dzialanie funkcji

        axios.post("https://akademia108.pl/api/social-app/user/signup", {
            username: formData.username,
            password: formData.password,
            email: formData.email
        })
            .then((res) => {
                console.log(res.data);

                let resData = res.data;

                if (resData.signedup) {
                    // signedup - z API, wartosc logiczna
                    setSignUpMessage("Account created")
                    setSignUpDone(true)
                } else {
                    if (resData.message.username) {
                        // tablica jedno elemeentowa?
                        setSignUpMessage(resData.message.username[0])
                    } else if (resData.message.email) {
                        setSignUpMessage(resData.message.email[0])
                    }

                }


            })
            .catch((error) => {
                console.error(error);
            });

        console.log('sent');
    }


    return (
        <div className="signUp">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                {errors.username && <p>{errors.username}</p>}
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                {errors.email && <p>{errors.email}</p>}
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                {errors.password && <p>{errors.password}</p>}
                <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleInputChange} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button className="btn" disabled={signUpDone}>Sign up</button>

                {signUpDone && (
                <div>
                <Link to='/login'>Log in</Link>
            </div>)}

            </form>
            </div>)
        };

            




export default SignUp;