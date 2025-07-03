import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

// Mock fetch for user data
const mockUsers = [
    {
        id: 1,
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        address: {
            street: "1 Main St",
            suite: "Apt 1",
            city: "Victoria",
            zipcode: "V1V 1V1",
            geo: { lat: "0", lng: "0" }
        },
        phone: "111-222-3333",
        website: "alice.com",
        company: {
            name: "Alice Co",
            catchPhrase: "We do things",
            bs: "business"
        }
    },
    {
        id: 2,
        name: "Bob Smith",
        username: "bobsmith",
        email: "bob@example.com",
        address: {
            street: "2 Main St",
            suite: "Apt 2",
            city: "Vancouver",
            zipcode: "V2V 2V2",
            geo: { lat: "0", lng: "0" }
        },
        phone: "444-555-6666",
        website: "bob.com",
        company: {
            name: "Bob Inc",
            catchPhrase: "Bob's the best",
            bs: "consulting"
        }
    }
];

beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => mockUsers
    } as Response);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("App", () => {
    it("renders the app title and logo", async () => {
        render(<App />);
        expect(screen.getByAltText(/BC Ferries Logo/i)).toBeInTheDocument();
        expect(screen.getByText(/User Directory App/i)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText("Alice Johnson")).toBeInTheDocument());
    });

    it("shows loading and then user cards", async () => {
        render(<App />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText("Alice Johnson")).toBeInTheDocument());
        expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    });

    it("filters users by name, phone, or company", async () => {
        render(<App />);
        await waitFor(() => expect(screen.getByText("Alice Johnson")).toBeInTheDocument());
        const input = screen.getByPlaceholderText(/search by name, phone or company/i);

        // Filter by name
        fireEvent.change(input, { target: { value: "bob" } });
        expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
        expect(screen.getByText("Bob Smith")).toBeInTheDocument();

        // Filter by phone
        fireEvent.change(input, { target: { value: "111-222" } });
        expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
        expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();

        // Filter by company
        fireEvent.change(input, { target: { value: "bob inc" } });
        expect(screen.getByText("Bob Smith")).toBeInTheDocument();
        expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    });

    it("shows popup with user details when a card is clicked", async () => {
        render(<App />);
        await waitFor(() => expect(screen.getByText("Alice Johnson")).toBeInTheDocument());
        fireEvent.click(screen.getByText("Alice Johnson"));

        // Await for popup to appear
        await (() => {
            expect(screen.getByText(/Username:/i)).toBeInTheDocument();
            expect(screen.getByText(/alicej/i)).toBeInTheDocument();
            expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/111-222-3333/)).toBeInTheDocument();
            expect(screen.getByText(/Alice Co/)).toBeInTheDocument();
        });
    });
});