import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import LoginContext from '../contexts/UserContext'
function Profile() {
    const { currentUser } = useContext(LoginContext)
    return (
        <div className="container-fluid d-flex flex-row">
            <div className="col-md-4 profile">
                <h3>Profile</h3>
                <div className='profileLeft'>
                    <FontAwesomeIcon className='icon' icon={faCircleUser} size="9x" />
                </div>
                <div className='info'>
                    {currentUser?.name ? (
                        <h4>Name: {currentUser.name}</h4>
                    ) : (
                        <h4>No name available</h4>
                    )}
                    {currentUser?.email ? (
                        <h4>Email: {currentUser.email}</h4>
                    ) : (
                        <h4>No email available</h4>
                    )}
                    {currentUser?.address ? (
                        <h4>Address: {currentUser.address}</h4>
                    ) : (
                        <h4>No Address available</h4>
                    )}
                </div>
<div className='post'>
    <h3>My Posts</h3>
</div>
            </div>
            <div className="border-start border-2 h-100 custom-line"></div>

            <div className="col-md-8 profileRight">
                <div className='container text-center'>
                    <FontAwesomeIcon className='icon' icon={faCircleUser} size="4x" />
                    <h3>Profile</h3>
                </div>
            </div>

        </div>
    )
}

export default Profile

