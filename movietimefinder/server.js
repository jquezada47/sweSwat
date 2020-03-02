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

	//get login email and password
	var emailLogin = req.body.emailLogin;
	var passwordLogin = req.body.passwordLogin;

    //check email and password and convert to boolean
    emailLogin = checkEmail(emailLogin);
    passwordLogin = checkPassword(passwordLogin);

    //check is user is in test database
    var isLogin = testUser(emailLogin,passwordLogin);
    //save to a string
	var login ="Email: "+emailLogin + "<br/>password: " +passwordLogin + "<br/>login: " + isLogin ;
	res.send(login);

});

server.post("/purchase", (req,res) =>{

    //get credit card info and call check methods 
    var nameCheck = checkName(req.body.name);
    var emailCheck = checkEmail(req.body.email);
    var cardCheck = valid_credit_card(req.body.card_num);
    var monthCheck = checkMonth(req.body.expr_month);
    var yearCheck = checkYear(req.body.expr_year);
    var yearCVV = checkCVV(req.body.cvv);

    //Save results to string
    var purchase = "Name: "+nameCheck +"<br/>Email: "+ emailCheck+"<br/>Card Num: "+ cardCheck 
    +"<br/>expr month: " + monthCheck + "<br/>expr year: " + yearCheck + "<br/>CVV: " +yearCVV;

    //Print the strings
    res.send(login + "<br/><br/><br/>" + purchase);
});



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


function checkName(name){
	if( /^[a-zA-Z]+$/.test(name) )
		return true;
	else
		return false;
}

function valid_credit_card(value) {
	//https://gist.github.com/DiegoSalazar/4075533
  // Accept only digits, dashes or spaces
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

function checkMonth(value){
	if(value>0 && value <=12)
		return true
	else 
		return false
}

function checkYear(value){
	if(value>2020 && value <=2050)
		return true
	else 
		return false
}

function checkCVV(value){
	if(value>99 && value <=999)
		return true
	else 
		return false
}
