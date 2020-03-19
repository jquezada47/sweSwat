// import router b/c this is a route
const router = require('express').Router();
// import the model schema
let Movie = require('../models/movie.model');


// route/endpoint, handles http get requests on /user url path
router.route('/').get((req, res) => {
  Movie.find()
  .then(movies => res.json(movies))
  .catch(err => res.status(400).json('Error: ' + err));
});


// /add path and if post request 
router.route('/add').post((req, res) => {
  // get the info submitted, that was in req object
  const title = req.body.title;
  const year = req.body.year;
  const genre = req.body.genre;
  const age = req.body.age;

   // create new instance of excercise
   const newMovie= new Movie({
    title,
    year,
    genre,
    age,
  });

//save to the DB
newMovie.save()
.then(() => res.json('Movie added!'))
.catch(err => res.status(400).json('Error: ' + err));
console.log("MOVIE added" +   title+
  year+
  genre+
  age)
});



router.route('/search').post((req, res) => {
   // get the info submitted, that was in req object
   const search = req.body.search;

  //require mongoose for DB
  const mongoose = require('mongoose');

    // find all user with matching email and password, return matches in result var
    Movie.find( { "title": { "$regex": search, "$options": "i" } }, function (err, result) {
      if (err) 
       return handleError(err);
       // if more than one matches then log user in
       if(result.length>0){
        let i;
        for(i=0;i<result.length;i++){
          console.log("Found title: "+ result[i].title)
        }

     // let SearchResult = result[0].title
       //res.send(SearchResult)
     }
   })

//res.redirect('http://localhost:3000')
//let a = "GOOOOOOOO"
//res.send(a);
});


module.exports = router;