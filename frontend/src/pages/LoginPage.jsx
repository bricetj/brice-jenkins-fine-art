/**
 * Brice Jenkins
 * Copyright 2025
 */

import Login from "../components/Login";

/**
 * Returns a login page by utilizing the Login component.
 */
function LoginPage({setLoggedIn, setUserEmail}) {
    return (
        <>
        <h2>Login</h2>
        <Login 
            setLoggedIn={setLoggedIn}
            setUserEmail={setUserEmail}>
        </Login>
        <p>Don't have an account? <a href="/register">Register</a></p>
        </>
    )
}

export default LoginPage;