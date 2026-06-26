# Anti-Waste Platform

## Overview
The Anti-Waste Platform is a web application designed to connect food businesses with consumers to reduce food waste. This platform allows users to purchase unsold food items at discounted prices, benefiting both the environment and the economy.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
The backend is built using Node.js and Express.js. It handles all server-side logic, database interactions, and API endpoints.

- **src/**: Contains the main application code.
  - **app.js**: Initializes the Express application and sets up middleware.
  - **server.js**: Starts the server and listens for incoming requests.
  - **routes/**: Contains route definitions for different resources.
    - **auth.js**: User authentication routes (login, registration).
    - **businesses.js**: Routes for managing businesses.
    - **offers.js**: Routes for managing offers.
    - **reservations.js**: Routes for managing reservations.
  - **controllers/**: Contains the logic for handling requests and responses.
    - **authController.js**: Authentication logic.
    - **businessController.js**: Business-related logic.
    - **offerController.js**: Offer-related logic.
    - **reservationController.js**: Reservation-related logic.
  - **models/**: Defines the data models for the application.
    - **user.js**: User model.
    - **business.js**: Business model.
    - **offer.js**: Offer model.
    - **reservation.js**: Reservation model.
  - **db/**: Handles database connection and configuration.
    - **database.js**: Database connection logic.
  - **utils/**: Contains utility functions.
    - **helpers.js**: Helper functions for various tasks.

- **package.json**: Lists dependencies and scripts for the backend.
- **.env.example**: Example environment variables for the backend.
- **README.md**: Documentation specific to the backend.

### Frontend
The frontend is built using HTML, Vanilla JavaScript, and Tailwind CSS. It provides the user interface for the application.

- **public/**: Contains static files.
  - **index.html**: Main HTML file for the frontend.
- **src/**: Contains the main application code.
  - **main.js**: Entry point for the frontend JavaScript.
  - **styles.css**: Main styles for the frontend.
  - **components/**: Contains reusable components.
    - **layout.js**: Layout component for structuring pages.
  - **pages/**: Contains different page components.
    - **home.js**: Home page component.
    - **offers.js**: Offers page component.
    - **profile.js**: User profile page component.
  - **api/**: Handles API requests to the backend.
    - **client.js**: API client for making requests.

- **package.json**: Lists dependencies and scripts for the frontend.
- **tailwind.config.js**: Configuration for Tailwind CSS.
- **postcss.config.js**: Configuration for PostCSS.

### Root
- **package.json**: Root configuration file for the entire project.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Documentation for the entire project.

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up environment variables by copying `.env.example` to `.env` and filling in the required values.

4. Start the backend server:
   ```
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

6. Start the frontend application:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.