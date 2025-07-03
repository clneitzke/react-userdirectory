import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserPopup from "./UserPopup";
import { User } from "../../types/User";

const mockUser: User = {
    id: 1,
    name: "Jane Smith",
    username: "teste",
    email: "jane@example.com",
    address: {
        street: "456 Elm St",
        suite: "Suite 200",
        city: "Victoria",
        zipcode: "V2V 2V2",
        geo: { lat: "0", lng: "0" }
    },
    phone: "987-654-3210",
    website: "janesmith.com",
    company: {
        name: "Smith Co",
        catchPhrase: "Quality First",
        bs: "consulting"
    }
};

describe("UserPopup", () => {
    it("renders all user details", () => {
        render(<UserPopup user={mockUser} onClose={() => { }} />);
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText(/teste/i)).toBeInTheDocument();
        expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/987-654-3210/)).toBeInTheDocument();
        expect(screen.getByText(/janesmith.com/i)).toBeInTheDocument();
        expect(screen.getByText(/456 Elm St, Suite 200, Victoria, V2V 2V2/)).toBeInTheDocument();
        expect(screen.getByText(/Smith Co/)).toBeInTheDocument();
        expect(screen.getByText(/Quality First/)).toBeInTheDocument();
        expect(screen.getByText(/consulting/)).toBeInTheDocument();
    });
});