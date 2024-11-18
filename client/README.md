# Capstone Project -HorseHealth Helper

## Overview

Horse Health Helper is an Journaling application targeted towards horse owners . The application provides users with the ability to add the horses information, and keep track of typical health concerns such as vaccines, and hoof care. This README will guide you through implementation, and usage of theHorseHealth Helper application.

## Table of Contents

- [Usage](#usage)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [Stretch Goals](#stretch-goals)

## Usage

You can perform the following actions:

- **Create an Account**: Enter your userName, email and password to create your own account.
- **Log In**: Enter your userName to have access to your personal account.
- **Add Your Horse**: Create a list of your horses, including pertinent information about them.
- **Journaling**: create your own journal for each horse you want to keep track of.
- **Log Out**: Press the "log out" button to end your session.
- **Delete a Horse**: remove any horse you no longer need to keep track of.
- **Delete Account**: Press a "delete account" button to delete your user.

## Frontend Implementation

### Overview

The frontend of Horse Health Helper is built with **React** and **styled-components** for dynamic styling. The frontend is responsible for rendering the UI, handling user interactions, and communicating with the backend to fetch and update data.

### Key Components

- **Home Page (Home.js)**: Displays a welcoming image and the place to log in or create an account.
- **Create User Page (CreateUser.js)**: Has a form to fill out that allows you to save your specific information.
- **Horses Page (Horses.js)**: Loads all entered horses by nickName, has "add horse" "log out", "delete acount" buttons.
- **Add Horse Page (AddHorse.js)**: Has a form to fill out that allows you to save your horses specific information.
- **Horse Health Page (HorseCare.js)**: Displays critical aspects of saved horse care, and allows new information to be saved in each section as well.

### Styling

- **Global Styles (GlobalStyles.js)**: Sets global styles for the application, ensuring a consistent look and feel across all components.
- **Styled Components**: Used extensively for individual component styling, ensuring modular and reusable styles.

### Interactivity

- **State Management**: React's `useState` and `useEffect` hooks are used for managing component states, such as the horses, care, and logIn status.
- **Context**: The `usersContext` component is used to dynamically keep track of the users authenticity.

## Backend Implementation

### Overview

The backend is implemented using **Node.js** and **Express.js**, following RESTful principles. **MongoDB** is used as the database to store and manage the application data.

### Core Functionalities

- **GET /user/:userName**: Fetches an individual user based on their unique userName from the database.
- **GET /horse/:horseId**: Fetches an individual horse based on its ID from the database.
- **POST /createUser**: Submits the user's information and updates the database accordingly.
- **POST /login**: verifies users login information and directs them to the Horses page.
- **POST /addHorse**: Submits the horse's information and updates the database accordingly.
- **PATCH /horse/:horseId**:Updates horse Health section based on the horse's ID, with the option of deleting the horse using the horse's ID.
- **DELETE /user/:userName**: Deletes the user's account based on the unique user's name and updates the database accordingly.

## Stretch Goals

The following additional features were implemented:

- **Responsiveness**: The application is fully responsive and adapts to different screen sizes.
- **MDBootstrap Integration**: Embedded a card layout on the Horses and HorseCare pages to display the list of horses and care sections.
