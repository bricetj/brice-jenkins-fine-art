import Logout from '../components/Logout';

function UserProfilePage ({ setLoggedIn }) {
    return(
        <div>
            <h2>User Profile</h2>
            <Logout setLoggedIn={setLoggedIn}></Logout>
        </div>
    )
}

export default UserProfilePage;