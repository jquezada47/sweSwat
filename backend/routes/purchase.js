const router = require('express').Router();
let Ticket = require('../models/ticket.model');
//{ "$regex": search, "$options": "i" }
// Inserts a new ticket in DB
router.route('/add').post((req, res) => {
  const name= req.body.name;
  const email= req.body.email;
  const cardnum= req.body.cardnum;
  const expiration= req.body.expiration;
  const CVV= req.body.CVV;

  // fake placeholder fir now until all DB table made
  let price = 10
  let type = "regular"
  let showID = 123
  let userID = 123
  let movieTitle = req.body.movieTitle
  console.log(movieTitle)
  let siteID = 123

  const newTicket= new Ticket({
   price,
   type,
   showID,
   userID ,
   movieTitle,
   siteID,
 });

  if(checkPurchase(name, email, cardnum, expiration, CVV)){
    newTicket.save()
    .then(() => res.json('Ticket added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log("Ticket added " +movieTitle)

    res.json(true)

  } else {
    console.log("WRONG FORMAT")
    res.json(false)
  }

});


//** function to check format of the purchase info's
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

    return(nameCheck&&emailCheck&& cardCheck&&expirCheck &&cvvCheck )

    //return purchase;
  }

  function checkName(name){
    if( /^[a-zA-Z ]+$/.test(name) && name.length <=30 && name.length >1)
      return true;
    else
      return false;
  }

  function checkEmail(mail) 
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      return (true)
    return (false)
  }

  module.exports.checkName = checkName;
  module.exports.checkEmail = checkEmail;
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

module.exports = router;