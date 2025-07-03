import React, { useEffect, useState, useCallback } from 'react';
import UserCard from './components/UserCard/UserCard';
import UserPopup from './components/UserPopup/UserPopup';

import './styles/App.css';

import { User } from './types/User';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const delay = async (ms: number | undefined) => {
        return new Promise((resolve) =>
            setTimeout(resolve, ms));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Simulate network delay to show loading state
                await delay(500);

                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: User[] = await response.json();
                setUsers(data);
                setError(null);
            } catch (error) {
                setUsers([]);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.phone.toLowerCase().includes(term) ||
            user.company?.name.toLowerCase().includes(term)
        );
    });

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleUserSelect = useCallback((user: User) => {
        setSelectedUser(user);
    }, []);

    const handlePopupClose = useCallback(() => {
        setSelectedUser(null);
    }, []);

    return (
        <div className="app" role="main">
            <img
                src={process.env.PUBLIC_URL + "/images/bcferries-logo.png"}
                alt="BC Ferries Logo"
                className="app-logo"
            />
            <h1 className="app-title">
                User Directory App
            </h1>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by name, phone or company..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search users"
                />
            </div>
            {loading && (
                <p className="loading-message" aria-live="polite">
                    Loading...
                </p>
            )}
            {error && (
                <p className="error-message" aria-live="polite">
                    Error: {error}
                </p>
            )}
            <div className="user-list">
                {filteredUsers.length === 0 && !loading && !error && (
                    <p>No users found.</p>
                )}
                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        style={{ cursor: "pointer", width: "100%" }}
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleUserSelect(user);
                            }
                        }}
                        aria-label={`View details for ${user.name}`}
                    >
                        <UserCard user={user} />
                    </div>
                ))}
            </div>
            {selectedUser && (
                <UserPopup
                    user={selectedUser}
                    onClose={handlePopupClose}
                />
            )}
        </div>
    );
};

export default App;