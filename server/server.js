// framework configuration
// const express = require("express");
// const connectDb = require("./Config/dbConnection");

// const errorHandler = require("./Middleware/errorHandler");
// // Errorhandler is a middleware function that catches errors that are thrown in the application and logs them to the console.
// // Middleware functions are functions that have access to the request object (req), the response object (res), 
// // and the next function in the application’s request-response cycle.

// const cors = require("cors");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' }) // cors for security at server side
// // CORS - Cross-Origin Resource Sharing.
// // It is a security feature implemented by browsers to prevent malicious websites from making requests to your server.

// const app = express();

// // env file config
// const dotenv = require("dotenv");
// dotenv.config();
// // we install dotenv package to use environment variables in our application.

// connectDb(); // db connection setup for crud operations

// // process.env.PORT is used to get the port number ,from the environment variable PORT
// // If the environment variable PORT is not set, then the port number is set to 5000
// // either file is frontend or backend pass all configurations through env file only.
// const port = process.env.PORT || 5000;

// var hbs=require('hbs');
// hbs.registerPartials(__dirname+'/views/partials',function(err){});
// app.set('view engine','hbs');


// app.use(express.json());
// app.use(cors());
// // error handler middleware
// app.use(errorHandler);

// // routes below
// app.get("/", (req, res) => {
//     res.send("Working");
// });

// app.get("/home",(req,res)=>{
//     // let user = User.findOne({id:})
//     res.render("home",{
//         username:"Ojasva",
//         posts:"No shit sherelok !"
//     })
// });
// app.get("/allusers",(req,res)=>{
//     const users=[
//         {username:"Gracy",age:20},
//         {username:"Sorabh",age:23},
//         {username:"Buddy",age:25}

//     ];
//     res.render("allusers",{
//        users:users
//     });

// });
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//      console.log(req.body);  
//      console.log(req.file);
//      return res.redirect("/home");
//   })

// // Route for user registration and authetication
// app.use("/api/",require("./Routes/userRoutes"));

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
//   const uploads = multer({ storage: multer.memoryStorage() });

// // app config start
// app.listen(port,()=> {
//     console.log(`Server is running on port http://localhost:${port}`);
// });
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer');
const fs = require("fs");


hbs.registerPartials(__dirname + '/views/partials', function(err) {});

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route for user registration and authentication
app.use("/api/register", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');

// Define storage for multer to save files to disk in the "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  // Make sure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ROUTES BELOW
app.get('/', (req, res) => {
  res.send("Working");
});

app.get("/home", (req, res) => {
  res.render("home", { username: 'Palak' });
});

app.get("/allusers", (req, res) => {
  res.render("users", {
    usersp: [
      { id: 1, username: "abc", age: 18 },
      { id: 2, username: "xyz", age: 19 }
    ]
  });
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/home");
  // req.file is the avatar file
  // req.body will hold the text fields, if there were any
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// New route to display images
app.get("/images", (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).send("Error loading images.");
    }

    const images = files.filter(file => {
      return file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif");
    });

    res.render("images", { images });
  });
});

// Start the server
app.listen(port, () => {
  console.log("Server running on port http://localhost:${port}");
});

