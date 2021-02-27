=================

## Start instructions

- Do `npm install` to install all dependencies.
- Start the DEV mode of the frontend by executing `npm start`.
- Start the REST API server by executing `npm run bootServer`.
  - Make sure your Node.js version is `>=10`.

## Run tests

- TBD

# The Stack

The codebase is bootstrapped with a frontend and a backend.

The frontend uses:

- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)
- [Parcel](https://parceljs.org/)
- [Babel](https://babeljs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

The backend is headless and uses:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

A CSV file is loaded into memory and serves as the data backend for the books API.

## Frontend Directory Structure

- Frontend business logic sits inside src folder
- All common components go into components folder
- All common utility functions go into utils folder
- Pages folder contains sub-folders for each page. Each page can have it's own components, utils, etc.

## Backend Directory structure

- Backend logic sits inside server folder
- All route handlers go inside routes folder
- admin folder inside routes is for administrative tasks like pinging, health checks, etc
- Create a sub-folder inside route folders for each API hierarchy. For example an api like `/a/b/c` should have a file with a name linked to `c` inside a folder called `b` inside a folder called `a`.

---
