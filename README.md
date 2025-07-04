# User Directory App

This is a simple User Directory application built with React. 

The app allows users to search for individuals by name, view their basic details, and display them in a visually appealing card layout.

## Features

- **User Search**: Users can search for individuals by typing their names, and the list will filter in real-time.
- **API Integration**: The app fetches user data from a free API on initial load and handles loading and error states.
- **User Information Display**: Each user card displays the user's name, phone number, and company name.
- **Reusable Components**: The application utilizes a reusable component `<UserCard />` to display user information.
- **Basic Styling**: The app includes basic CSS styling for a clean and visually appealing layout.


## Data Source
https://jsonplaceholder.typicode.com/users

````
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  ````

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/clneitzke/react-userdirectory.git
   ```
2. Navigate to the project directory:
   ```
   cd react-userdirectory
   ```
3. Install the dependencies:
   ```
   npm install
   ```
### Testing

```
npm test
```
### Running the Application

To run the application in development mode, use the following command:
```
npm start
```
This will start the React application and open it in your default web browser at `http://localhost:3000`.

### Built With

- React
- TypeScript
- CSS

