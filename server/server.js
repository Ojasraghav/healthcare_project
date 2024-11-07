// framework configuration
const express = require("express");
const connectDb = require("./Config/dbConnection");

const errorHandler = require("./Middleware/errorHandler");
// Errorhandler is a middleware function that catches errors that are thrown in the application and logs them to the console.
// Middleware functions are functions that have access to the request object (req), the response object (res), 
// and the next function in the application’s request-response cycle.

const cors = require("cors"); // cors for security at server side
// CORS - Cross-Origin Resource Sharing.
// It is a security feature implemented by browsers to prevent malicious websites from making requests to your server.

const app = express();

// env file config
const dotenv = require("dotenv");
dotenv.config();
// we install dotenv package to use environment variables in our application.

connectDb(); // db connection setup for crud operations

// process.env.PORT is used to get the port number ,from the environment variable PORT
// If the environment variable PORT is not set, then the port number is set to 5000
// either file is frontend or backend pass all configurations through env file only.
const port = process.env.PORT || 5000;

var hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partials',function(err){});
app.set('view engine','hbs');


app.use(express.json());
app.use(cors());
// error handler middleware
app.use(errorHandler);

// routes below
app.get("/", (req, res) => {
    res.send("Working");
});

app.get("/home",(req,res)=>{
    // let user = User.findOne({id:})
    res.render("home",{
        username:"Gracy",
        posts:"bla bla bla"
    })
});
app.get("/allusers",(req,res)=>{
    const users=[
        {username:"Gracy",age:20},
        {username:"Sorabh",age:23},
        {username:"Buddy",age:25}

    ];
    res.render("allusers",{
       users:users
    });
});

// Route for user registration and authetication
app.use("/api/",require("./Routes/userRoutes"));

// app config start
app.listen(port,()=> {
    console.log(`Server is running on port http://localhost:${port}`);
});

