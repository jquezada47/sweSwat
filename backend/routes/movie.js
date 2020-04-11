// import router b/c this is a route
const router = require('express').Router();
// import the model schema
let Movie = require('../models/movie.model');
let days = require('../models/days.model');

// route/endpoint, handles http get requests on /user url path
router.route('/').get((req, res) => {
  days.find()
  .then(days => res.json(days))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/search').post((req, res) => {
   // get the info submitted, that was in req object
   const search = req.body.search;

  //require mongoose for DB
  const mongoose = require('mongoose');
//{ "$regex": search, "$options": "i" }

console.log("SEARCHING FOR "+ search +" " + req.body.location)
    //console.log(req.body.location)
    // find all user with matching email and password, return matches in result var
    days.aggregate( 
     [
       // Match the "documents" that meet your criteria
       { "$match": {
         "movies_array.title": { "$regex": search, "$options": "i" }
       }},

       // Unwind the arrays to de-normalize as documents
       { "$unwind": "$movies_array" },
       { "$unwind": "$movies_array.title" },

       // Match only the element(s) that meet the criteria
       { "$match": {
         "movies_array.title": { "$regex": search, "$options": "i" },
        // "theater": { "$regex": req.body.location, "$options": "i" },
      }}

      ]

      , function (err, result) {
        if (err) 
         return handleError(err);
       // if more than one matches then log user in
       if(result.length>0){
        let i;
        let searchResult
        for(i=0;i<result.length;i++){

        }

        res.send(result)
      }
    })

  });


module.exports = router;