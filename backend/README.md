# Anti-Waste Platform Backend

This is the backend for the Anti-Waste Platform, a web application designed to connect food businesses with consumers to reduce food waste.

## Project Structure

The backend is organized into several key directories:

- **src/**: Contains the source code for the application.
  - **app.js**: Initializes the Express application and sets up middleware.
  - **server.js**: Starts the server and listens for incoming requests.
  - **routes/**: Contains route definitions for different resources.
    - **auth.js**: User authentication routes (login, registration).
    - **businesses.js**: Routes for managing businesses (CRUD operations).
    - **offers.js**: Routes for managing offers (create, retrieve, update).
    - **reservations.js**: Routes for managing user reservations.
  - **controllers/**: Contains the logic for handling requests.
    - **authController.js**: Functions for authentication logic.
    - **businessController.js**: Functions for business-related logic.
    - **offerController.js**: Functions for offer-related logic.
    - **reservationController.js**: Functions for reservation-related logic.
  - **models/**: Defines the data models for the application.
    - **user.js**: User model schema and methods.
    - **business.js**: Business model schema and methods.
    - **offer.js**: Offer model schema and methods.
    - **reservation.js**: Reservation model schema and methods.
  - **db/**: Handles database connection and configuration.
    - **database.js**: Database connection setup.
  - **utils/**: Contains utility functions.
    - **helpers.js**: General helper functions.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd anti-waste-platform/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Running the Application

To start the server, run:
```
npm start
```

The server will be running on `http://localhost:3000` by default.

## API Documentation

Refer to the individual route files for detailed API documentation on how to interact with the backend services.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.