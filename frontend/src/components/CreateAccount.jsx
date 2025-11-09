// import { useState } from 'react';

function CreateAccount() {
    return (
        <div className="login-block">
            <form className="login-form">
                <div className="login-input-block">
                    <div><label className="login-label">First Name</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your first name"
                            required>
                        </input>
                    </div>
                </div>
                <div className="login-input-block">
                    <div><label className="login-label">Last Name</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your last name"
                            required>
                        </input>
                    </div>
                </div>
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
                            placeholder="Enter your password"
                            type="password" 
                            required>
                        </input>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateAccount;