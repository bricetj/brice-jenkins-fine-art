import Login from "../components/Login";

function LoginPage({setLoggedIn}) {
    return (
        <>
        <h2>Login</h2>
        <Login setLoggedIn={setLoggedIn}></Login>
        <p>Don't have an account? <a href="/register">Register</a></p>
        </>
    )
}

export default LoginPage;