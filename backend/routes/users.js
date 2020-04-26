// import router b/c this is a route
const router = require("express").Router();
// import the model schema
let User = require("../models/users.model");

global.userLoggedIn = false;

// first route/endpoint, handles http get requests on /user url path
router.route("/").get((req, res) => {
  console.log(userLoggedIn);
  //find is a mongoose method
  User.find()
    // get all the users and return in json format
    .then((users) => res.json(users))
    //error handling
    .catch((err) => res.status(500).json("Error: " + err));
});

// first route/endpoint, handles http get requests on /user url path
router.route("/profile").post((req, res) => {
  const mongoose = require("mongoose");
  let name = req.body.name;
  let email = req.body.email;

  profile(req.body.name, req.body.email, res);
});

// Insert new user to DB
router.route("/add").post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let birth = req.body.birth;
  let gender = req.body.gender;

  if (checkLogin(email, password) && checkName(name)) {
    // create new instance of user
    const newUser = new User({
      email,
      password,
      name,
      birth,
      gender,
    });

    //save to the DB
    newUser
      .save()
      // then return 'user added' in json
      .then(() => res.json(true))
      .catch((err) => res.status(500).json("Error: " + err));

    console.log(email + " " + password + " " + name + "   " + birth);

    res.json(true);
  } else {
    res.json(false);
  }
});

// LOGIN checks if matches in DB
router.route("/in").post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;

  //require mongoose for DB
  const mongoose = require("mongoose");

  // previous function to check format of email and password before query
  login(email, password, res);
});

//**Previous functions to check format of inputs
function checkLogin(email, password) {
  //calls email checking method
  var emailCheck = checkEmail(email);
  //calls password checking method
  var passwordCheck = checkPassword(password);
  console.log(
    "email format: " + emailCheck + "- password format: " + passwordCheck
  );

  //return "Email: "+emailCheck+"<br/>password: " +passwordCheck + "<br/>login: " +result;
  return emailCheck && passwordCheck;
}

function checkEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
  return false;
}

function checkPassword(password) {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return re.test(password);
}

function checkName(name) {
  if (/^[a-zA-Z ]+$/.test(name) && name.length <= 30 && name.length > 1)
    return true;
  else return false;
}

function login(email, password, res) {
  if (checkLogin(email, password)) {
    // find all user with matching email and password, return matches in result var
    User.find(
      { email: { $regex: new RegExp(email, "i") }, password: password },
      function (err, result) {
        if (err) return handleError(err);
        // if more than one matches then log user in
        if (result.length > 0) {
          //console.log("Logged In ")

          res.json(result[0]);
          console.log(result[0].email);

          // res.cookie("logged", result.email, {expire: 200000 + Date.now()});
        }
      }
    );
  } else {
    res.json(false);
  }
}

function profile(name, email, res) {
  if (checkName(name) && checkEmail(email)) {
    // find all user with matching email and password, return matches in result var
    User.find(
      { email: { $regex: new RegExp(email, "i") }, name: name },
      function (err, result) {
        if (err) return handleError(err);

        if (result.length > 0) {
          console.log(result);

          res.json(result[0]);
        }
      }
    );
  } else {
    res.json(false);
  }
}

const functions = {
  checkLogin: function (email, password) {
    //calls email checking method
    var emailCheck = checkEmail(email);
    //calls password checking method
    var passwordCheck = checkPassword(password);
    console.log(
      "email format: " + emailCheck + "- password format: " + passwordCheck
    );

    //return "Email: "+emailCheck+"<br/>password: " +passwordCheck + "<br/>login: " +result;
    return emailCheck && passwordCheck;
  },
  checkEmail: function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
    return false;
  },
  checkPassword: function (password) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
  },
  checkName: function (name) {
    if (/^[a-zA-Z ]+$/.test(name) && name.length <= 30 && name.length > 1)
      return true;
    else return false;
  },
  login: function (email, password, res) {
    if (checkLogin(email, password)) {
      // find all user with matching email and password, return matches in result var
      User.find(
        { email: { $regex: new RegExp(email, "i") }, password: password },
        function (err, result) {
          if (err) return handleError(err);
          // if more than one matches then log user in
          if (result.length > 0) {
            console.log("Logged In: " + email + " " + password);
          }
        }
      );

      return true;
    } else {
      return false;
    }
  },
};

module.exports = functions;

// exporting the router
module.exports = router;
