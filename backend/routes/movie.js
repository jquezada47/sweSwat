// import router b/c this is a route
const router = require("express").Router();
// import the model schema
let Movie = require("../models/movie.model");
let days = require("../models/days.model");

// route/endpoint, handles http get requests on /user url path
router.route("/").get((req, res) => {
  days
    .find()
    .then((days) => res.json(days))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/search").post((req, res) => {
  // get the info submitted, that was in req object

  let title = req.body.title;
  let address = req.body.location;
  let dateSearch = req.body.date;
  let start = req.body.start;
  let end = req.body.end;

  let day = req.body.day;

  console.log(
    title + " " + address + " " + dateSearch + " " + start + " " + end
  );
  var date = "";
  if (dateSearch) {
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    date = month[parseInt(dateSearch.substring(5, 7)) - 1];

    date = date + " " + dateSearch.substring(8, 10);
  }

  if (day) date = day;
  //console.log(search+" " +address+ " " +date + " "+ time)

  if (start == 0 && end == 0) search(title, address, date, res);
  else searchWithTime(title, address, date, start, end, res);
});

function search(title, address, date, res) {
  days.aggregate(
    [
      // Match the "documents" that meet your criteria
      {
        $match: {
          "movies_array.title": { $regex: title, $options: "i" },
        },
      },
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },
      {
        $match: {
          day: { $regex: date, $options: "i" },
        },
      },

      // Unwind the arrays to de-normalize as documents
      { $unwind: "$movies_array" },

      // Match only the element(s) that meet the criteria
      {
        $match: {
          "movies_array.title": { $regex: title, $options: "i" },
        },
      },
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },
      {
        $match: {
          day: { $regex: date, $options: "i" },
        },
      },
    ],
    function (err, result) {
      if (err) return handleError(err);

      if (result.length > 0) res.send(result);

      console.log(result);
    }
  );
}

function searchWithTime(title, address, date, start, end, res) {
  days.aggregate(
    [
      // Match the "documents" that meet your criteria
      {
        $match: {
          "movies_array.title": { $regex: title, $options: "i" },
        },
      },
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },
      {
        $match: {
          day: { $regex: date, $options: "i" },
        },
      },
      {
        $match: {
          "movies_array.times.start": { $gte: start },
        },
      },
      {
        $match: {
          "movies_array.times.start": { $lte: end },
        },
      },

      // Unwind the arrays to de-normalize as documents
      { $unwind: "$movies_array" },

      // Match only the element(s) that meet the criteria
      {
        $match: {
          "movies_array.title": { $regex: title, $options: "i" },
        },
      },
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },
      {
        $match: {
          day: { $regex: date, $options: "i" },
        },
      },
      {
        $match: {
          "movies_array.times.start": { $gte: start },
        },
      },
      {
        $match: {
          "movies_array.times.start": { $lte: end },
        },
      },
    ],
    function (err, result) {
      if (err) return handleError(err);

      if (result.length > 0) res.send(result);

      console.log(result);
    }
  );
}

function searchAddress(address, res) {
  days.aggregate(
    [
      // Match the "documents" that meet your criteria
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },

      // Unwind the arrays to de-normalize as documents
      { $unwind: "$movies_array" },

      // Match the "documents" that meet your criteria
      {
        $match: {
          address: { $regex: address, $options: "i" },
        },
      },
    ],
    function (err, result) {
      if (err) return handleError(err);

      if (result.length > 0) res.send(result);

      console.log(result);
    }
  );
}

module.exports = router;
