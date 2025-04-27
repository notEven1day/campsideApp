import React, { useState } from 'react';
import './LoginForm.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice.js';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        fetch('https://localhost:7130/api/User/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    dispatch(setUser(data)); // Dispatch user data to Redux store
                    navigate('/home'); // Navigate to home page after login
                } else {
                    console.log('No user data found');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleSignUpRedirect = () => {
        navigate('/signupform'); // Redirect to the sign-up page
    };

    return (
        <div className="container">
            <h2>Welcome to our camp rating app!</h2>
            <form id="loginForm">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={handleUsernameChange}
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handlePasswordChange}
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <Button type="primary" block={true} onClick={handleLogin}>
                    Log in
                </Button>
                <p>Dont have an account?</p>
                <div className="signup-container">
                    <Button type="default" block={true} onClick={handleSignUpRedirect}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
