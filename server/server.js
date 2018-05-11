const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const controller = require("./controller");
const app = express();
app.use(bodyparser.json());
mongoose.connect("mongodb://root:root@ds117070.mlab.com:17070/challange");
app.use(
  session({
    secret: "supersecretstring12345!",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
    // store: new MongoStore({ mongooseConnection: mongoose.connection }) //not neccesary
  })
);
app.use(
  cors({
    //tis adds session to req, like so: req.session
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);
controller(app);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening...");
});
