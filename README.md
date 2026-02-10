# **Kraftshala Calendar Booking Backend Service**

    This project is a backend calendar booking service built as part of the Kraftshala – Intern, Backend Developer assignment.

    The service allows users to create accounts and schedule meetings, while ensuring that no two meetings overlap in time.

    The project is intentionally kept simple, clean, and readable, focusing on backend fundamentals rather than over-engineering.



##### What This Project Does

    1 -> Creates and manages users

    2 -> Allows users to schedule meetings

    3 -> Prevents overlapping meeting time slots

    4 -> Exposes REST APIs using Express

    5 -> Uses MySQL as the database with Sequelize ORM

    6 -> The main business rule is:

    7 -> A meeting cannot overlap with an existing meeting for the same user.


##### Tech Stack Used

    1 -> Node.js

    2 -> JavaScript ’t Express.js

    3 -> Sequelize ORM

    4 -> MySQL Database


## How to Run the Project Locally

1. Clone the repository
    git clone https://github.com/LokeshMadaka/Kraftshala-calendar-booking.git
    cd calendar-booking-service


2. Install dependencies
    npm install


3. Create MySQL database
    Open MySQL and run:
        CREATE DATABASE calendar_db;


4. Setup environment variables
    Create a .env file in the project root:
        PORT=3000
        DB_NAME=calendar_db
        DB_USER=root
        DB_PASSWORD=your_mysql_password
        DB_HOST=localhost


5. Start the server
    npm run dev

        or

    npm start

        or

    cd src
    node server.js


Expected output:
    Database connected
    Server running on port 3000


##### API Endpoints:
**User APIs**

Create User
    POST /users

Request body:
    {
    "name": "Lokesh",
    "email": "lokesh12@gmail.com"
    }


Get User by ID
    GET /users/:id


**Meeting APIs**
Create Meeting
    POST /meetings


Request body:
    {
    "userId": 1,
    "title": "Team Meeting",
    "startTime": "2026-02-10T10:00:00.000Z",
    "endTime": "2026-02-10T10:30:00.000Z"
    }


List Meetings
    GET /meetings

Query params:
    userId
    startDate
    endDate


Update Meeting
    PUT /meetings/:id

Delete Meeting
    DELETE /meetings/:id


#### Meeting Conflict Rule

Before creating or updating a meeting, the system checks for overlaps.
A conflict exists when:
    existing.startTime < new.endTime
    AND
    existing.endTime > new.startTime


If a conflict is found, the API returns:
    Status Code: 400
    Message: "Time slot already booked"


#### Error Handling

    Invalid input -> 400 Bad Request

    Resource not found -> 404 Not Found

    Meeting conflict -> 400 Bad Request

    Successful delete -> 204 No Content

Errors are handled centrally using middleware.


**Notes**
    Time values are stored as DATETIME in MySQL

    Business logic is handled in the service layer

    Controllers remain thin and readable