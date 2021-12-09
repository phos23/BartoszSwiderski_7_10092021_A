// import React, { useState } from 'react';
import React from 'react';
import { apiUrl, capitalizeFirstLetter } from '../main';
// import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { usePersistedState } from '../store';
import Button from './Button';
import '../styles/Login.css';

function Login() {
    // const [loginState, login] = useState(false);

    const history = useHistory();

    function loginUser(event) {
        event.preventDefault();
        const [email, password] = event.target.elements
        // const email = document.getElementById('login-email').value
        // const password = document.getElementById('login-password').value
        axios.post(`${apiUrl}/users/login`, {
            "email": email.value,
            "password": password.value
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userName', res.data.user.firstName);
                // login(true)
                history.push('/newsfeed')

                // if (loginState) {
                // }
                // setTimeout(history.push("/newsfeed"), 2000)
                // history.push("/newsfeed");
            })
    }

    function registerUser(event) {
        event.preventDefault();
        const [email, firstName, secondName, password, rePassword] = event.target.elements;
        if (password.value !== rePassword.value) {
            return alert("Passwords don't match!")
        }
        axios.post(`${apiUrl}/users/register`, {
            "email": email.value,
            "password": password.value,
            "firstName": capitalizeFirstLetter(firstName.value),
            "secondName": capitalizeFirstLetter(secondName.value)
        }).then(res => {
            console.log(res)
            alert(res.data.status)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="login-wrapper">
            <h2 className='login-text'>Welcome in Groupmania!</h2>
            <p className='login-text'>In order to proceed, you must login or register first. Please use forms below:</p>
            <div className="forms">
                <div className="login">
                    <h2>Login</h2>
                    <form action="submit" onSubmit={loginUser} className="login-form">
                        <label htmlFor="login-email">Email:</label>
                        <input type="email" id="login-email" placeholder="example@email.com" name="login-email" required />

                        <label htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" placeholder="•••••••••••" name="login-password" required />
                        <Button type='submit' className='login' buttonContent='Login' />
                    </form>
                </div>
                <div className="register">
                    <h2>Register</h2>
                    <form action="submit" onSubmit={registerUser} className="register-form">
                        <label htmlFor="register-email">Email: </label>
                        <input type="email" id="register-email" placeholder="example@email.com" name="register-email" required />

                        <label htmlFor="register-fist-name">Fist Name:</label>
                        <input type="text" id="register-fist-name" placeholder="John" name="register-fist-name" required />

                        <label htmlFor="register-second-name">Second Name: </label>
                        <input type="text" id="register-second-name" placeholder="Doe" name="register-second-name" required />

                        <label htmlFor="register-password">Password: </label>
                        <input type="password" id="register-password" placeholder="•••••••••••" name="register-password" required />

                        <label htmlFor="register-repeat-password">Repeat Password: </label>
                        <input type="password" id="register-repeat-password" placeholder="•••••••••••" name="register-repeat-password" required />

                        <Button type='submit' className='login' buttonContent='Register' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login