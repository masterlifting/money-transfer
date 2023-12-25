<!-- @format -->

# Fullstack Developer Portfolio Application

## Overview

This application showcases my general skills as a Fullstack Developer. It is built focus on:

- **Backend and Frontend Integration**:
  - Using Node.js, Express for the backend, and React, Redux Toolkit, Tailwind for the frontend.
  - Using TypeScript for both the backend and frontend.
  - The backend and frontend are separate applications, and communicate via REST API calls.
  - Using Docker to containerize the application.
- **Functional Programming Style**: Adherence to functional programming principles.
- **Responsive Design**: Ensuring compatibility with various PC screen sizes.
- **Rendering Optimization**: Aiming to minimize unnecessary rendering.
- **Features**: Includes sorting, pagination, basic simple authorization/authentication, and input validation. The password handling is not implemented securely and is only for demonstration purposes.
- **Component Libraries**: Developed without reliance on external component libraries to showcase my ability to build components from scratch.

## Running the Application

### Using Docker

1. **Clone the repository**:
   `git clone https://github.com/masterlifting/money-transfer`
2. **Navigate to the repository**:
   `cd money-transfer`
3. **Start the application**:
   `docker-compose -p money-transfer up -d --build`
4. **Stop the application**:
   `docker-compose -p money-transfer down -v`

### Without Docker

1. **Check Node.js installation**: Run `node -v` and `npm -v`. Install from [Node.js](https://nodejs.org/en/download/) if necessary.
2. **Clone the repository**:
   `git clone https://github.com/masterlifting/money-transfer`
3. **Backend Setup**:

- **Navigate to the backend directory**: `cd backend`
- **Install dependencies**: `npm install`
- **Start the backend**: `npm start`

4. **Frontend Setup**:

- **Navigate to the frontend directory**: `cd frontend`
- **Install dependencies**: `npm install`
- **Start the frontend**: `npm start`

_The backend will be accessible at http://localhost:5000, and the frontend at http://localhost:3000._

## Using the Application

### Pages

- **Home** (`/`): Accessible post-authorization and has the following features:
  - **Transaction List**: User transactions with sorting and pagination.
  - **Transaction Form**: Create or repeat transactions.
  - **User Details**: Username, balance, and login/logout or register options.
- **Login** (`/login`): Registered users can log in to the application.
- **Register** (`/register`): New users receive a $500 Welcome bonus from the Bank of Internal Money.

**Note**: For transaction functionality, register two users and log in with one.
