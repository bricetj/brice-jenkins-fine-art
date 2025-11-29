/**
 * Brice Jenkins
 * Copyright 2025
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupWindow from '../components/PopupWindow';

/**
 * Displays a simple menu with links for the user to see their
 * order history, logout, or delete their account. 
 */
function UserProfilePage ({ setLoggedIn }) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [actionText, setActionText] = useState('');
    const [action, setAction] = useState();

    const navigate = useNavigate();

    // Calls /logout endpoint in authorization microservice.
    const handleLogout = async() => {
        const response = await fetch(
            "http://localhost:3001/auth/logout", {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-type': 'application/json'}
            }
        )
        if(response.status === 200) {
            setLoggedIn(false);
            alert("Logout successful");
            navigate('/login');
        } else {
            alert("Logout error");
        }
    }

    // Calls /logout endpoint in authorization microservice.
    const handleDelete = async() => {
        const response = await fetch(
            "http://localhost:3001/auth/users/myaccount", {
                method: 'DELETE',
                credentials: 'include'
            }
        )
        if(response.status === 200) {
            setLoggedIn(false);
            alert("Account successfully deleted");
            navigate('/login');
        } else {
            alert("Error deleting account");
        }
    }

    // Handles opening the reset popup window.
    const openPopupHandler = () => {
        setPopupOpen(true);
    }

    // Handles closing the reset popup window.
    const onClose = () => {
        setPopupOpen(false);
    }

    return(
        <div>
            <h2>User Profile</h2>
            <Link to='/order-history'>Order History</Link>
            <br/>
            <br/>
            <Link 
                to='#'
                onClick={()=>{
                    setMessageText('log out')
                    setActionText('Log out');
                    setAction(() => handleLogout);
                    openPopupHandler();
                }
            }>Logout</Link>
            <br/>
            <br/>
            <Link 
                to='#'
                onClick={()=>{
                    setMessageText('delete your account')
                    setActionText('Delete');
                    setAction(() => handleDelete);
                    openPopupHandler();
                }
            }>Delete Account</Link>
            <div>
                <PopupWindow text={`Are you sure you want to ${messageText}?`}
                    isVisible={popupOpen}
                    noButtonText={'Cancel'}
                    yesButtonText={actionText}
                    onNo={onClose}
                    onYes={action}>
                </PopupWindow>
            </div>
        </div>
    )
}

export default UserProfilePage;