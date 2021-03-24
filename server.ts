const dotenv = require('dotenv');
const express = require('express');
// initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send("Hello world!");
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
