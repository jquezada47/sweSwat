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


router.route('/search').post((req, res) => {
   // get the info submitted, that was in req object
   const search = req.body.search;

  //require mongoose for DB
  const mongoose = require('mongoose');

  Movie.aggregate([{
    $lookup: {
        from: "movies", // collection name in db
        localField: "title",
        foreignField: "showtimes",
        as: "entries"
    }
}]).exec(function(err, students) {
    // students contain WorksnapsTimeEntries
});

    // find all user with matching email and password, return matches in result var
    Movie.find( { "title": { "$regex": search, "$options": "i" } }, function (err, result) {
      if (err) 
       return handleError(err);
       // if more than one matches then log user in
       if(result.length>0){
        let i;
        let r = new Array();
        for(i=0;i<result.length;i++){
          console.log("Found title: "+ result[i].title)
        }

       res.send(result)
     }
   })

//res.redirect('http://localhost:3000')
//let a = "GOOOOOOOO"
//res.send(a);
});


module.exports = router;