const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 var movies_arraySchema = new Schema({
        movie_name: String
    })



    var theaters_arraySchema = new Schema({
        theater_name: String,

        theater_address: String,

        movies_array: [movies_arraySchema]
    })
    



    var daysSchema = new Schema({
        day: String,
        
        theaters_array: [theaters_arraySchema]
    });


const days = mongoose.model('days', daysSchema);

module.exports = days;