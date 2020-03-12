//const functions = require('./functions');

/*function checkName(name){
	if( /^[a-zA-Z ]+$/.test(name) && name.length <=30 && name.length >1)
		return true;
	else
		return false;
}*/

var funct = require('./server.js');

test('Enter valid name only letters', () =>{
	expect(funct.checkName('John')).toBe(true);
});

test('Enter valid name only letters', () =>{
	expect(funct.checkLogin('John@gmail.com',"Password123")).toBe(true);
});







