import React from 'react';

const Profile = () => {
    return (
        <div className="profile-container">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
                <p><strong>Role:</strong> Client</p>
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
        </div>
    );
};

export default Profile;