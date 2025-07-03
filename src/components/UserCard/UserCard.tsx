import React from "react";
import { User } from "../../types/User";
import "./UserCard.css";

export interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
    <div className="user-card">
        <h3>{user.name}</h3>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
    </div>
);

export default UserCard;