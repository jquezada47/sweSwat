// import router b/c this is a route
const router = require('express').Router();
// import the model schema
let User = require('../models/user.model');


// first route/endpoint, handles http get requests on /user url path
router.route('/').get((req, res) => {
  //find is a mongoose method
  User.find()
    // get all the users and return in json format
    .then(users => res.json(users))
    //error handling
    .catch(err => res.status(400).json('Error: ' + err));
  });


// /add path and if post request 
router.route('/add').post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const birth = req.body.birth;
  
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
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));

  console.log(email + " "+ password + " "+name + " "+birth)
});



// login
router.route('/in').post((req, res) => {
  // get the info submitted, that was in req object
  const email = req.body.email;
  const password = req.body.password;

  //require mongoose for DB
  const mongoose = require('mongoose');

  // previous function to check format of email and password before query
  console.log("format: "+checkLogin(email,password));
  if(checkLogin(email,password)){

    // find all user with matching email and password, return matches in result var
    User.find({ 'email': email,'password': password }, function (err, result) {
      if (err) 
       return handleError(err);
       // if more than one matches then log user in
       if(result.length>0){
         console.log("Logged In: "+ email + " "+ password)
       }
     })
  }
});






//**Previous function to check format of inputs
function checkLogin(email,password){
  //calls email checking method
  var emailCheck = checkEmail(email)
  //calls password checking method 
  var passwordCheck = checkPassword(password) 
  
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

  function checkPurchase(name, email, cardNum, expiration, cvv){
   //get credit card info and call check methods 
   var nameCheck = checkName(name);
   var emailCheck = checkEmail(email);
   var cardCheck = valid_credit_card(cardNum);
   var expirCheck = checkExpiration(expiration);
   var cvvCheck = checkCVV(cvv);

    //Save results to string
    var purchase = "Name: "+nameCheck +"<br/>Email: "+ emailCheck+"<br/>Card Num: "+ cardCheck 
    +"<br/>experation: " + expirCheck + "<br/>CVV: " +cvvCheck;

   // if(nameCheck&&emailCheck&& cardCheck&&expirCheck &&cvvCheck ){

    return purchase;
  }

  function checkName(name){
    if( /^[a-zA-Z ]+$/.test(name) && name.length <=30 && name.length >1)
      return true;
    else
      return false;
  }
  module.exports.checkName = checkName;
  module.exports.checkLogin = checkLogin;
  module.exports.checkEmail = checkEmail;
  module.exports.checkPassword = checkPassword;
  module.exports.checkPurchase = checkPurchase;
  module.exports.valid_credit_card = valid_credit_card;
  module.exports.checkExpiration = checkExpiration;
  module.exports.checkCVV = checkCVV;


  function valid_credit_card(value) {
  //https://gist.github.com/DiegoSalazar/4075533
  // Accept only digits, dashes or spaces
  if (value=="" || value.length<16 || value.length >19)
    return (false)

  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0, bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
    nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}

function checkExpiration(value){
  if(/^(\d{1,2})\/\d{1,2}$/.test(value)){

    var i = value.indexOf("/");
    var sub1 = value.substring(0,i)
    var sub2 = value.substring(i+1,value.length)
    console.log(sub1 + " " +sub2);
    if(sub1<1||sub1>12|sub2<21||sub2>50)
      return false
    
    return true
  }
  else 
    return false
}


function checkCVV(value){
  if(value>99 && value <=999)
    return true
  else 
    return false
}



// exporting the router 
module.exports = router;