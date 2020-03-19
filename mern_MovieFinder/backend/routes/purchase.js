const router = require('express').Router();
let Purchase = require('../models/purchase.model');


router.route('/').get((req, res) => {
  Purchase.find()
  .then(purchase => res.json(purchasecase))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const name= req.body.name;
  const email= req.body.email;
  const cardnum= req.body.cardnum;
  const expiration= req.body.expiration;
  const CVV= req.body.CVV;

  console.log(checkPurchase(name, email, cardnum, expiration, CVV))

  const newPurchase= new Purchase({
   name,
   email,
   cardnum,
   expiration,
   CVV
 });
  if(checkPurchase(name, email, cardnum, expiration, CVV)){
    newPurchase.save()
    .then(() => res.json('Purchase added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log("Purchase added" +name+" "+email+" "+cardnum+" "+expiration+" "+CVV)
  }
  else
    console.log("WRONG FORMAT")
});





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

module.exports = router;