import React from 'react';
import logo from './logo.svg';
import './App.css';
/*<label for="movies">Choose a movie:</label>
<select  name="movies" >
  <option value="Sonic The Hedgehog"> Sonic The Hedgehog </option>
  <option value="The Invisible Man"> The Invisible Man </option>
  <option value="The Call Of The Wild"> The Call Of The Wild </option>
  <option value="Harley Quinn: Birds Of Prey"> Harley Quinn: Birds Of Prey</option>
</select>

<br/><br/>

<label for="showtime">Choose a showtime:</label>
<select name="showtime" >
  <option value="1pm"> 1:00 pm </option>
  <option value="2pm"> 3:00 pm </option>
  <option value="5pm"> 5:00 pm</option>
  <option value="9pm"> 7:00 pm</option>
</select>

<br/><br/>

Enter amount of tickets<input type="number" name="ticket"/> 
<br/><br/>*/

function App() {
  return (
    <div className="App">

    <div>


    <form method="POST" action="http://localhost:3001/login">
    Login
    <br/>
    Email:<input type="text" name="emailLogin"/> 
    <br/>
    Password:<input type="text" name="passwordLogin"/> 
    <br/>

    <input type="submit" value="LOGIN"/>
    <hr/>
    </form>





    <form method="POST" action="http://localhost:3001/login">

    Purchase
    <br/>
    Name:<input type="text" name="name"/> 
    <br/>

    Email:<input type="text" name="email"/> 
    <br/><br/>

    Card Number:<input type="text" name="card_num"/> 
    <br/>

    Experation Month:<input type="text" name="expr_month"/> 
    <br/>
    Experation Year:<input type="text" name="expr_year"/>
    <br/>
    CVV number:<input type="text" name="cvv"/> 

    <br/>
    <input type="submit" value="Purchase"/>
    </form> 

    </div>

    </div>

    );
  }


  export default App;
