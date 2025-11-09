// import { useState } from 'react';

function Login() {
    return (
        <div className="login-block">
            <form className="login-form">
                <div className="login-input-block">
                    <div><label className="login-label">Email</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your email"
                            required>
                        </input>
                    </div>
                </div>
                <div className="login-input-block">
                    <div><label className="login-label">Password</label></div>
                    <div>
                        <input
                            className="login-input"
                            type="password" 
                            placeholder="Enter your password"
                            required>
                        </input>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;