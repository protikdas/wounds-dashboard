# Wounds Medical Dashboard

Wounds Medical Dashboard is a demo web application that fetches and updates patient and wounds information using a custom api.

## Getting Started

### Installation

Before installing the app, please check that you have node and npm installed on your computer.
To check if you have Node.js installed, run this command in your terminal:

```
$ node -v
```

To confirm that you have npm installed you can run this command in your terminal:

```
$ npm -v
```

If they are not installed, please visit for installation instructions: [Node.JS and npm Installation Instructions](https://www.npmjs.com/get-npm)

##### I. From Zip File

If you have a zip file with the project source code, uncompress the zip file. From the command line interface of your computer, navigate to the uncompressed folder, and enter the following command:

```
$ npm install
```

Node Package Manager will now install all the required dependencies for the app.

##### II. From Github Repository

If you have the Git CLI installed on your computer, from the command line interface, you can clone the git repository of the app by entering the following command:

```
$ git clone https://github.com/protikdas/wounds-medical-dashboard.git
```

Once the download is completed, navigate to the app folder, and enter the following command:

```
$ npm install
```

### Start

After the installation is complete, enter the following command:

```
$ npm start
```

This command will start a local development server on your computer, and the app can be accessed from a browser at:
_http://localhost:3333_

The command will also start the API server concurrently at:
_http://0.0.0.0:3000_

And the proxy express server will be started at:
_http://localhost:5000_

### Login

In order to login to the app, please use the password below:

```
@fleming
```

Authentication has not yet been set up for the app, and the password is just hard coded into the app.

### Build for Production

To bundle all the JSX code and process all the Less code to CSS, enter the following command:

```
$ npm run build
```

A build folder will be created in the app directory once the build process is completed, the build folder can then be deployed to an app hosting service of choice (eg. Heroku).

### API

Please note that this application is only usable when the custom API is running locally at port "http://0.0.0.0:3000". To allow cross origin requests to the API server, a proxy server has been written with Express.

## Built With

- React (JavaScript Library)

  React was chosen as the JavaScript library to seamlessly render different views based on user interaction and changes in data in the app. Using React also helped make the app very modular, and allowed the implementation of higher level components to improve code reusability.

- Redux (JavaScript Library)

  Redux was used to manage the application state, resulting in a centralized state (one source of truth), and it was much easier to plan and thus predict state updates across the app.

- Express (Node.js Server Framework)

  Express was used to write a server that proxies HTTP requests the web application makes to the local API server.

- LESS (CSS Preprocessor)

  LESS was used for styling the app and to declare variables to store different color hex codes and font names to be used globally throughout the app. Webpack precompiler scripts were added to compile the LESS code to browser-readable CSS code for both dev and production environments.

## Author

- Protik Das (protikdas@hotmail.com)

## License

This project is licensed under the MIT License
