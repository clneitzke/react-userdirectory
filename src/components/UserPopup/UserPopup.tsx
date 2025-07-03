import React, { useEffect } from "react";
import { User } from "../../types/User";
import './UserPopup.css';

export interface UserPopupProps {
    user: User;
    onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ user, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="user-popup-overlay" onClick={onClose}>
            <div className="user-popup-modal" onClick={e => e.stopPropagation()} >
                <button onClick={onClose} className="user-popup-close" aria-label="Close" >
                    ×
                </button>
                <h2 style={{ color: "#005fa3", marginBottom: 8 }}>{user.name}</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <p>
                    <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                </p>
                <p>
                    <strong>Company:</strong> {user.company.name}<br />
                    <em>{user.company.catchPhrase}</em><br />
                    <span>{user.company.bs}</span>
                </p>
            </div>
        </div>
    );
};

export default UserPopup;