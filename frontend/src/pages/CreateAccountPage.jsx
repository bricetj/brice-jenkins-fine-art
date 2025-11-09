import CreateAccount from "../components/CreateAccount";

function CreateAccountPage() {
    return (
        <>
        <h2>Create an Account</h2>
        <CreateAccount></CreateAccount>
        <p>Already a member? <a href="/login">Log in</a></p>
        </>
    )
}

export default CreateAccountPage;