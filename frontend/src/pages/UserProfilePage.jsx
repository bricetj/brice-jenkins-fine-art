import Logout from '../components/Logout';
import DeleteUser from '../components/DeleteUser';


function UserProfilePage ({ setLoggedIn }) {
    return(
        <div>
            <h2>User Profile</h2>
            <Logout setLoggedIn={setLoggedIn}></Logout>
            <br/>
            <br/>
            <DeleteUser setLoggedIn={setLoggedIn}></DeleteUser>
        </div>
    )
}

export default UserProfilePage;