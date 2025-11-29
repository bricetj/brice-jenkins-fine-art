/**
 * Brice Jenkins
 * Copyright 2025
 */

import CreateAccount from "../components/CreateAccount";

/**
 * Creates a page to display the CreateAccount component.
 */
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