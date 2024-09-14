# Event Management System

## Description

The Event Management System is a web application that allows users to manage events, including creating, viewing, and joining events. It provides functionalities for user registration, login, event creation, RSVP, and management of join requests. The application uses JWT for authentication and features toast notifications for a better user experience.

## Features

- *User Authentication*: Register and log in securely with JWT.
- *Event Creation*: Users can create new events with details like title, description, date, time, and location.
- *Event Viewing*: View a list of all events and details of individual events.
- *RSVP*: RSVP to events and view the list of attendees.
- *Manage Join Requests*: Event creators can approve or reject requests from users who wish to join their events.
- *Notifications*: Toast notifications for registration and login.

## Installation

1. *Clone the repository*:

   ```bash
   git clone https://github.com/yourusername/event-management-system.git
Navigate to the project directory:

cd event-management-system

Install backend dependencies:
cd backend
npm install

Install frontend dependencies:
cd ../frontend
npm install

Set up environment variables:
Create a .env file in the backend directory.
Add your environment variables, such as JWT_SECRET and MONGO_URI.

Start the backend server:
cd backend
npm start

Start the frontend application:
cd ../frontend
npm start
Register: Go to /register to create a new account.
Login: If already registered then go to /login to sign in.
View Events: Navigate to /events to see a list of all events.
Create Event: Use /create-event to create a new event.
Event Details: Click on an event to view its details and manage join requests if you're the event creator.
Contributing
If you'd like to contribute to this project, please fork the repository and create a pull request with your proposed changes. Make sure to follow the coding standards and provide a clear description of your changes.

