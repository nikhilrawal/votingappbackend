# Voting System Backend

This project is a highly functional backend for a voting system, built using modern web technologies. It provides user and admin routes, allowing users to view candidates and cast their votes. The system ensures secure and efficient handling of voting processes, making it suitable for various voting scenarios.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and voting data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Render**: Cloud platform for hosting the backend, enabling seamless integration with frontend applications.

## Application Flow
1. **User Registration and Login**: Users can sign up and log in to the system.
2. **Candidate Display**: Users can view a list of candidates available for voting.
3. **Voting**: Authenticated users can cast their votes for their preferred candidates.
4. **Admin Management**: Admins can add new candidates and view the voting results.

This backend can be hosted on Render for easy deployment and integration with frontend applications.

## API Endpoints

The Voting System Backend provides the following API endpoints:

### User Routes

#### 1. Sign Up
- **Endpoint:** `POST /api/users/signup`
- **Description:** Register a new user.
- **Request Format:**
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User registered successfully",
        "user": {
            "id": "string",
            "username": "string",
            "email": "string"
        }
    }
    ```

#### 2. Login
- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticate a user.
- **Request Format:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User logged in successfully",
        "token": "string"
    }
    ```

#### 3. View Candidates
- **Endpoint:** `GET /api/users/candidates`
- **Description:** Retrieve a list of candidates available for voting.
- **Response:**
    ```json
    {
        "candidates": [
            {
                "id": "string",
                "name": "string",
                "description": "string"
            },
            ...
        ]
    }
    ```

#### 4. Vote
- **Endpoint:** `POST /api/users/vote`
- **Description:** Cast a vote for a candidate.
- **Request Format:**
    ```json
    {
        "candidateId": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Vote cast successfully"
    }
    ```

### Admin Routes

#### 1. Add Candidate
- **Endpoint:** `POST /api/admin/candidates`
- **Description:** Add a new candidate.
- **Request Format:**
    ```json
    {
        "name": "string",
        "description": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Candidate added successfully",
        "candidate": {
            "id": "string",
            "name": "string",
            "description": "string"
        }
    }
    ```

#### 2. View Votes
- **Endpoint:** `GET /api/admin/votes`
- **Description:** Retrieve a list of votes cast.
- **Response:**
    ```json
    {
        "votes": [
            {
                "id": "string",
                "userId": "string",
                "candidateId": "string",
                "timestamp": "string"
            },
            ...
        ]
    }
    ```
## Usage

### User Registration and Login

1. **Sign Up:**
    - Send a `POST` request to `/api/users/signup` with the following JSON body:
        ```json
        {
            "username": "john_doe",
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    - You will receive a response confirming the registration.

2. **Login:**
    - Send a `POST` request to `/api/users/login` with the following JSON body:
        ```json
        {
            "email": "john@example.com",
            "password": "password123"
        }
        ```
    - You will receive a token in the response, which you will use for authenticated requests.

### Viewing Candidates and Voting

1. **View Candidates:**
    - Send a `GET` request to `/api/users/candidates`.
    - You will receive a list of candidates available for voting.

2. **Vote for a Candidate:**
    - Send a `POST` request to `/api/users/vote` with the following JSON body:
        ```json
        {
            "candidateId": "candidate_id_here"
        }
        ```
    - You will receive a response confirming that your vote has been cast.

### Admin Operations

1. **Add a Candidate:**
    - Send a `POST` request to `/api/admin/candidates` with the following JSON body:
        ```json
        {
            "name": "Jane Doe",
            "description": "A brief description of the candidate."
        }
        ```
    - You will receive a response confirming that the candidate has been added.

2. **View Votes:**
    - Send a `GET` request to `/api/admin/votes`.
    - You will receive a list of votes cast in the system.

## Installation and Setup

To get started with the Voting System Backend, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/voting-system-backend.git
    cd voting-system-backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following variables:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```sh
    npm start
    ```

The backend server should now be running on `http://localhost:3000`.