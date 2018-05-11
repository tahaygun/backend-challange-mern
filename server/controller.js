const bodyparser = require("body-parser");
const expressValidator = require("express-validator");
const User = require("./models/User");
const Article = require("./models/Article");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
module.exports = function(app) {
  function authenticateUser(req, res, next) {
    if (req.session.user) return next();
    res.json({ error: true, message: "Not authenticated, please login!" });
  }
  const regValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email should be an email address"),
    check("fullname")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isLength({ min: 4 })
      .withMessage("Name should be at least 4 letters")
      .matches(/^([A-z]|\s)+$/)
      .withMessage("Name cannot have numbers"),
    check("aboutyou")
      .not()
      .isEmpty()
      .withMessage("Personal description is required")
      .matches(/^([A-z]|\s)+$/)
      .withMessage("Personal description cannot have numbers"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters"),
    check(
      "password_con",
      "Password confirmation  is required or should be the same as password"
    ).custom(function(value, { req }) {
      if (value !== req.body.password) {
        throw new Error("Password don't match");
      }
      return value;
    }),
    check("email").custom(value => {
      return User.findOne({ email: value }).then(function(user) {
        if (user) {
          throw new Error("This email is already in use");
        }
      });
    })
  ];
  function createUser(req, res) {
    const user = new User(req.body);
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }

    user.password = user.hashPassword(user.password);
    user
      .save()
      .then(user => {
        return res.json({
          ok: true,
          message: "You are successfully registerated."
        });
      })
      .catch(error => {
        return res.json({
          error: "Something went wrong, user is not registerated!",
          error
        });
      });
  }
  app.post("/api/register", regValidation, createUser);
  //
  //
  //@login user
  const logValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
  ];
  function loginUser(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.mapped() });
    }
    User.findOne({
      email: req.body.email
    })
      .then(function(user) {
        if (!user) {
          return res.status(401).json({
            errors: {
              usernotfound: { errors: true, msg: "User does not exist!" }
            }
          });
        }
        if (!user.comparePassword(req.body.password, user.password)) {
          return res.status(401).json({
            errors: {
              wrongPass: { errors: true, msg: "Wrong password!" }
            }
          });
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post("/api/login", logValidation, loginUser);
  //
  //
  //@get all users
  app.get("/api/getusers", (req, res) => {
    User.find().then(users => {
      res.send(users);
    });
  });

  //
  //
  //@is user logged in?
  app.get("/api/isloggedin", (req, res) => {
    if (req.session.isLoggedIn) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

  //
  //
  //@current user check

  app.get("/api/current_user", function(req, res) {
    if (req.session.user) {
      User.findById(req.session.user._id, { password: 0 }).then(function(user) {
        res.send(user);
      });
    } else {
      res.send({ error: true, message: "You are not logged in!" });
    }
  });

  //
  //
  //@add article
  const articleValidation = [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 10 })
      .withMessage("Title should be at least 10 characters"),
    check("summary")
      .not()
      .isEmpty()
      .withMessage("Summary is required.")
      .isLength({ min: 10 })
      .withMessage("Summary should be at least 10 characters"),
    check("article")
      .not()
      .isEmpty()
      .withMessage("Article is required.")
      .isLength({ min: 80 })
      .withMessage("Article should be at least 80 characters"),
    check("keywords")
      .not()
      .isEmpty()
      .withMessage("You should add at least one tag.")
      .matches(/^([A-z+,]|\s)+$/)
      .withMessage("Keywords cannot have numbers")
  ];

  function addarticle(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var article = new Article(req.body);
    article.user = req.session.user._id;
    article
      .save()
      .then(user => {
        res.json({ success: true });
      })
      .catch(error => {
        res.json(error);
      });
  }
  app.post("/api/addarticle", articleValidation, authenticateUser, addarticle);

  //
  //
  //get all articles
  app.get("/api/getarticles", (req, res) => {
    Article.find()
      .populate("user", { password: 0 })
      .sort({ createdAt: "desc" })
      .then(articles => {
        res.json(articles);
      })
      .catch(err => res.json(err));
  });
  //
  //
  //@get one random article
  app.get("/api/getrandomone", (req, res) => {
    Article.find()
      .populate("user", { password: 0 })
      .then(articles => {
        var x = Math.floor(Math.random() * articles.length + 0);
        res.json(articles[x]);
      })
      .catch(err => res.json(err));
  });

  //
  //
  //@get one by id
  app.get("/api/getone/:id", (req, res) => {
    Article.findById(req.params.id)
      .populate("user", { password: 0 })
      .then(article => {
        res.json(article);
      })
      .catch(err => {
        res.json(err);
      });
  });
  //
  //
  //@ logout
  app.get("/api/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logged out!" });
  });

  //
  //
  //@get author information

  app.get("/api/getuser/:id", (req, res) => {
    Article.find({ user: req.params.id })
      .then(result => {
        User.findById(req.params.id)
          .then(user => {
            res.json({ articles: result, user: user });
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  });

  //
  //
  //@image
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }

  const storage = multer.diskStorage({
    destination: "./files/",
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  // Init Upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single("image");

  app.post("/api/picture", (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.send({
          msg: err
        });
      } else {
        if (req.file == undefined) {
          res.send({
            msg: "Error: No File Selected!"
          });
        } else {
          res.send({
            msg: "File Uploaded!",
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  });
};
