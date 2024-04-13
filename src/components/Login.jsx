import React from 'react';
import axios from 'axios';

const Login = () => {
    const handleGoogleLogin = async () => {
        try {
            // const response = await axios.get('http://localhost:8080/login/oauth/code/google');
            // window.location.href = response.data.redirectUrl;
            window.location.href = 'http://localhost:8080/login/oauth/code/google'
        } catch (error) {
            console.error('Error initiating Google login:', error);
        }
    };
    return (
        <div>
            <h1>Welcome to our Social Login App!</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;