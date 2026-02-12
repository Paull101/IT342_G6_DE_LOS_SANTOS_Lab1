import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            alert("Login Failed! Please check your credentials.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}> {/* This is where 'handleLogin' is used */}
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;