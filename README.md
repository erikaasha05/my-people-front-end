<div align="center">
  <a href="[https://github.com/github_username/repo_name](https://github.com/erikaasha05/my-people-front-end)">
    <img src="src/my_people_logo.png" alt="Logo" width="100" height="100">
  </a>
</div>
  
  <h1 align="center">My People</h1>
  <p>My People was created for my Ada Developers Academy's Capstone project. This web app helps you organize your contacts. Users can add contacts, view contact information, and set reminders for important dates, and search for contacts by name.</p>

  
# About The Project

## Features

* Users can add contacts and provide information for each contact
* Contact information can be updated
* Users can add reminders for events, important dates, when to reach out to a contact
* Users can search for contacts by name

## Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

## Dependencies

* react bootstrap
* react-icons
* axios
* react-router-dom
* react-toastify
* date-fns
* @react-google-maps/api
* react-geocode

## Setup

To get a local copy, fork and clone this repo, then run `$ yarn install` in the project directory. To begin the local development server, run `$ yarn start`.

### Create `.env` File

Since the front-end sends API requests to the back-end and uses Google Maps API, the front-end needs to include a `.env` with the following:

```
REACT_APP_BACKEND_URL=http://127.0.0.1:5000
REACT_APP_GOOGLE_MAPS_API_KEY="YOUR KEY HERE"
```
Replace `YOUR KEY HERE` with your Google Maps API Key. 

<!--
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
-->



<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
