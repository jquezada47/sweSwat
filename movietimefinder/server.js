// Import statements
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

// Global Variables
const port = 3001;

// SQL Database connection
const database = mysql.createConnection({
	host: "localhost",
	user: "server",
	password: "Server_Test123"
});

// const client = new MongoClient(url);
const root = path.join(__dirname, "build");

// Creates the server
const server = express(bodyParser.json());




var urlencodedParser = bodyParser.urlencoded({ extended: false })




server.listen(port, () => {
	console.log(`Server listening of port ${port}`);
	console.log(`Root folder at ${root}`);
});

server.get("/", (req, res) => {
	console.log("Someone Connected");

	res.send("Welcome To the backend");

});

server.post("/login",urlencodedParser, (req, res) => {
	//res.redirect(3001,"http://localhost:3001/");

	//get login info from form in req object
	var email = req.body.emailLogin;
	var password = req.body.passwordLogin;

	//call login function and save result string
	var login = checkLogin(email,password);

	//print the result string
	res.send(login);

});

server.post("/purchase",urlencodedParser, (req,res) =>{

	//get credit card info from form in req object
	var name = req.body.name;
	var email = req.body.email;
	var cardNum = req.body.card_num;
	var expiration = req.body.expiration;
	var cvv = req.body.cvv;

    //call purchase method to validate form
    var purchase = checkPurchase(name, email, cardNum, expiration, cvv);

    //Print the strings
    res.send(purchase);
});


function checkLogin(email,password){
	//calls email checking method
	var emailCheck = checkEmail(email)
	//calls password checking method 
	var passwordCheck = checkPassword(password) 
	//calls user DATABASE checking method
	var isLogin = testUser(email, password);

	if(isLogin)
		var result = "<br/>login SUCCESSFUL";
	else
		var result = "<br/>login FAILED";


	return "Email: "+emailCheck+"<br/>password: " +passwordCheck + "<br/>login: " + isLogin +""+result;
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

function testUser(email,pass){
	var testEmail = "user@gmail.com";
	var testPassword = "Password123";

	if (email == testEmail && pass==testPassword)
		return true
	else 
		return false
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

    if(nameCheck&&emailCheck&& cardCheck&&expirCheck &&cvvCheck )
    	purchase=purchase+"<br/>purchase SUCCESSFUL";
    else
    	purchase=purchase+"<br/>purchase FAILED";

    return purchase;
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
