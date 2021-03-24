import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from 'body-parser';
// initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );