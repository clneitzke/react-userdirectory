import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserCard from "./UserCard";
import { User } from "../../types/User";

const mockUser: User = {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    address: {
        street: "123 Main St",
        suite: "Apt 1",
        city: "Vancouver",
        zipcode: "V1V 1V1",
        geo: { lat: "0", lng: "0" }
    },
    phone: "123-456-7890",
    website: "johndoe.com",
    company: {
        name: "Doe Industries",
        catchPhrase: "Innovation for you",
        bs: "business stuff"
    }
};

describe("UserCard", () => {
    it("renders user name, phone, and company", () => {
        render(<UserCard user={mockUser} />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
        expect(screen.getByText(/Doe Industries/)).toBeInTheDocument();
    });
});