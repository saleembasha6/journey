/*const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://0.0.0.0:27017/journey', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to Database"));

// Define a schema for the data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone:Number,
    checkIn: Date,
    days:Number,
    persons: Number,
    departFrom: String,
    destination: String,
    comments: String
    // Add other fields here as needed
});

// Create a model based on the schema
const UserModel = mongoose.model('User', userSchema);

// POST route to handle form submission
app.post("/submit", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var checkIn= req.body['check-in']
    var days = req.body.days
    var persons= req.body.persons
    var departFrom= req.body['depart-from']
    var destination= req.body.to

    var newUser = new UserModel({
         name: name,
        email: email,
        phone: phone,
        checkIn: checkIn,
        days: days,
        persons: persons,
        departFrom: departFrom,
        destination: destination, // Corrected variable name
        comments: req.body.comments
        // Add other fields as needed
    });

    newUser.save()
        .then(user => {
            console.log("Record inserted successfully:", user);
            return res.redirect('packages.html');
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send("Error saving data");
        });
});

// GET route for redirection
app.get("/submit", (req, res) => {
    res.redirect('index.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
*/
/*const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://0.0.0.0:27017/journey', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to Database"));

// Define a schema for the data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    checkIn: Date,
    days: Number,
    persons: Number,
    departFrom: String,
    destination: String,
    comments: String
    // Add other fields here as needed
});

// Create a model based on the schema
const UserModel = mongoose.model('User', userSchema);

// POST route to handle form submission
app.post("/submit", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var checkIn = req.body['check-in'];
    var days = req.body.days;
    var persons = req.body.persons;
    var departFrom = req.body['depart-from'];
    var destination = req.body.to;

    var newUser = new UserModel({
        name: name,
        email: email,
        phone: phone,
        checkIn: checkIn,
        days: days,
        persons: persons,
        departFrom: departFrom,
        destination: destination,
        comments: req.body.comments
        // Add other fields as needed
    });

    newUser.save()
        .then(user => {
            console.log("Record inserted successfully:", user);
            return res.redirect('packages.html');
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send("Error saving data");
        });
});

// Define a route for the admin panel
// Define a route for the admin panel
app.get("/admin", async (req, res) => {
    try {
        // Fetch data from MongoDB using async/await
        const users = await UserModel.find({});
        // Render admin panel template with data
        res.render("admin", { users: users });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching data from the database");
    }
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
*/



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'public'));




app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'your_secret_key', // Change this to a random string
    resave: false,
    saveUninitialized: false
}));

mongoose.connect('mongodb://0.0.0.0:27017/journey', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to Database"));

// Define a schema for the data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    checkIn: Date,
    days: Number,
    persons: Number,
    departFrom: String,
    destination: String,
    comments: String
    // Add other fields here as needed
});

// Create a model based on the schema
const UserModel = mongoose.model('User', userSchema);
app.post("/submit", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var checkIn = req.body['check-in'];
    var days = req.body.days;
    var persons = req.body.persons;
    var departFrom = req.body['depart-from'];
    var destination = req.body.to;

    var newUser = new UserModel({
        name: name,
        email: email,
        phone: phone,
        checkIn: checkIn,
        days: days,
        persons: persons,
        departFrom: departFrom,
        destination: destination,
        comments: req.body.comments
        // Add other fields as needed
    });
    newUser.save()
    .then(user => {
        console.log("Record inserted successfully:", user);
        return res.redirect('pop.html');
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send("Error saving data");
    });
});

// Review Model
const Review = mongoose.model('Review', {
    name: String,
    rating: Number,
    comment: String
  });
  
  
  
  // Routes
  app.post('/reviews', async (req, res) => {
    try {
      const { name, rating, comment } = req.body;
      const review = new Review({ name, rating, comment });
      await review.save();
      res.status(201).send(review);
    } catch (error) {
      res.status(400).send(error);
    }
  
  });
  
  app.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.render('reviews', { reviews });
    } catch (error) {
        res.status(500).send("Error fetching reviews.");
    }
});



// Define the admin username and password
const adminUsername = "admin";
const adminPassword = "password"; // You should use a more secure password in a production environment

// Define a route for the admin panel login form
app.get("/admin/login", (req, res) => {
    res.render("login"); // Assuming you have a login.ejs file in your views folder
});

// Define a route to handle admin panel login form submission
app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        // Successful login
        req.session.isAdminLoggedIn = true;
        res.redirect("/admin");
    } else {
        // Incorrect username or password
        res.status(401).send("Unauthorized");
    }
});

// Middleware to check if user is logged in as admin
function isAdminAuthenticated(req, res, next) {
    if (req.session.isAdminLoggedIn) {
        next();
    } else {
        res.redirect("/admin/login");
    }
}


// Define a route for the admin panel
app.get("/admin", isAdminAuthenticated, async (req, res) => {
    try {
        // Fetch data from MongoDB using async/await
        const users = await UserModel.find({});
        // Render admin panel template with data
        res.render("admin", { users: users }); // Pass the users variable to the template
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching data from the database");
    }
});

// Define a route for user logout
app.get("/logout", (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            // Redirect to the login page after successful logout
            res.redirect("/admin/login");
        }
    });
});

app.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.render('index.ejs', { reviews });
    } catch (error) {
        res.status(500).send("Error fetching reviews.");
    }
});




// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
