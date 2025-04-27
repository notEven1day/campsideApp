import React, { useState } from 'react';
import './SignUpForm.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleSignUp = () => {
        if (username && password && firstName && lastName) {
            fetch('https://localhost:7130/api/User/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    firstName,
                    lastName,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        navigate('/'); // Redirect to login page after successful sign-up
                    } else {
                        console.log('Error: User not created');
                    }
                })
                .catch((error) => console.error('Error:', error));
        } else {
            console.log('Please fill in all fields');
        }
    };

    const handleBackToLogin = () =>
    {
        navigate('/');
    }


    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form id="signUpForm">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={handleUsernameChange}
                        type="text"
                        id="username"
                        name="username"
                        value={username}
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
                        value={password}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        onChange={handleFirstNameChange}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        onChange={handleLastNameChange}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        required
                    />
                </div>
                <Button type="primary" block={true} onClick={handleSignUp}>
                    Sign Up
                </Button>
                <Button type="primary" block={true} onClick={handleBackToLogin}>
                    Back To Login
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
