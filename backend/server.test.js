//**Previous function to check format of inputs
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



//const funct = require('./routes/users')

test('Login test 1', () =>{
	expect(checkLogin('John@gmail.com',"Password123")).toBe(true);
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




test('Puchase ticket test 1', () =>{
  expect(checkPurchase("John", "john@email.com", "5555555555554444","12/23","123" )).toBe(true);
});

