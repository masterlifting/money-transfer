<!-- @format -->

# This is a WEB application for the task 'LEARN-8126' of the 'SharpDevelopers' company

#### The application is written in React and TypeScript

#### The link of the technical task for the application is https://docs.google.com/document/d/1NMfvzJq173mqQwrMq5-s5PqQ-c6kZE1ZqhTbruGsv80/edit

#### I was focusing on the following points:

- The application does not have a backend
- The application should be written in React and TypeScript
- The application should be written in a functional style
- The application should be written using React Hooks and Hooks Patterns
- Tha application should have a responsive design
- The application should have a minimum of rendering
- The application should have a sorting and pagination
- The application should have a simple authorization and authentication
- The application should have a simple validation
- The application should not use the external component libraries

## Run the application

### If you have the Docker installed on your machine, use the following commands:

- Clone the repository

  `git clone https://github.com/masterlifting/sharpdevelopers/ -b dev-react-redux`

- Run the application from the root directory of the repository

  `docker-compose -p sharp-dev-react-app up -d --build`

- Stop the application

  `docker-compose -p sharp-dev-react-app down -v`

### If you do not want to use the Docker, use the following commands:

- Ensure that you have the Node.js installed on your machine

  `node -v`

  `npm -v`

- If you do not have the Node.js installed, please install it from the https://nodejs.org/en/download/

- Clone the repository

  `git clone https://github.com/masterlifting/sharpdevelopers/ -b dev-react-redux`

- Install the dependencies

  `npm install`

- Run the application

  `npm start`

### The application will be available on the http://localhost:3000

## Use the application

### The application has the following pages:

- The 'Home' page by default using the '/' route
- The 'Login' page using the '/login' route
- The 'Register' page using the '/register' route

### The 'Home' page has the following features:

- The authorization is required to access the 'Home' page
- For the registration, the user gets 500$ on the balance as a Welcome bonus
- The 'Home' page has a list of the users' transactions
- The 'Home' page has a sorting and pagination of the users' transactions
- The 'Home' page has a form to create a new transaction or repeat the existing one
- The username, balance, and login/logout icons or a register button on the top bar can be seen.

#### To create a new transaction, please register two users and log in with the first user. Then, you can complete a new transaction or repeat the existing one.
