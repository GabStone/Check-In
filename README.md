# Check-In
NodeJS Server for mobile application

### Core technologies:
- NodeJS
- ExpressJS
- MongoDB
- Mongoose
- Passport Authentication
- Winston Logging


###Running the Server:
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server with nodemon

## Application Structure
- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `documentation/` - This folder will contain the API spec and any relevant documention.
- `config/`' - This folder will contain a configuration file for our server.


Created By Gabriel Stone (@GabStone)
