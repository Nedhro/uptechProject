import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';
import session from 'express-session';
const urls = require('./routes/router');

// initialize configuration
dotenv.config();
const port = process.env.SERVER_PORT;
const dbURI =process.env.DB_URI;

//Db connect
mongoose.connect(dbURI,
    {useNewUrlParser: true,
        useUnifiedTopology: true}, 
    ()=>{
    console.log("Database is connected");
});
mongoose.Promise = global.Promise;

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.use(express.json())
app.use(cors())
app.use('/api',urls)

app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`)
})
