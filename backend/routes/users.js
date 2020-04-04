// import router b/c this is a route
const router = require('express').Router();
// import the model schema
let User = require('../models/users.model');


// first route/endpoint, handles http get requests on /user url path
router.route('/').get((req, res) => {
  //find is a mongoose method
  User.find()
    // get all the users and return in json format
    .then(users => res.json(users))
    //error handling
    .catch(err => res.status(500).json('Error: ' + err));
  });


// Insert new user to DB
router.route('/add').post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const birth = Date.parse(req.body.birth);

  
  // create new instance of user
  const newUser = new User({
  	email,
  	password,
  	name,
  	birth
  });

  //save to the DB
  newUser.save()
  // then return 'user added' in json
  .then(() => res.json(true))
  .catch(err => res.status(500).json('Error: ' + err));

  console.log(email + " "+ password + " "+name + " "+birth)
});



// LOGIN checks if matches in DB
router.route('/in').post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;

  //require mongoose for DB
  const mongoose = require('mongoose');

  // previous function to check format of email and password before query

  if(checkLogin(email,password)){

    // find all user with matching email and password, return matches in result var
    User.find({   "email" : { $regex : new RegExp(email, "i") }  ,'password': password }, function (err, result) {
      if (err) 
       return handleError(err);
       // if more than one matches then log user in
       if(result.length>0){
         console.log("Logged In: "+ email + " "+ password)
       }
     })
     res.json(true)
  }
  else{
    res.json(false)
  }
  
});


//**Previous functions to check format of inputs
function checkLogin(email,password){
  //calls email checking method
  var emailCheck = checkEmail(email)
  //calls password checking method 
  var passwordCheck = checkPassword(password) 
  console.log("email format: "+emailCheck + "- password format: " + passwordCheck);
  
  //return "Email: "+emailCheck+"<br/>password: " +passwordCheck + "<br/>login: " +result;
  return emailCheck&&passwordCheck;
}

function checkEmail(mail) 
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    return (true)
  return (false)
}

function checkPassword(password) 
{
 // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
  }

// exporting the router 
module.exports = router;