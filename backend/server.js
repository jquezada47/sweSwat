// MIDDLEWARE using express, cors, and mongoose, axios
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//configures so variables in the env file?
//require('dotenv').config();


//create express server on port 5000
const app = express();
const port = process.env.PORT || 5000;

//middleware, allows to parse json, b/c our server sends and receives json
app.use(cors());
app.use(express.json());

// database uri from mongoDB website,have to set ATLAS envir var
const uri = "mongodb+srv://mean123:mean123@cluster0-dzp1h.mongodb.net/test?retryWrites=true&w=majority/";
// start connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to Database!");
})

// require the files, importing
const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movie');
const purchaseRouter = require('./routes/purchase');

// then use the files, when ever some go /movie then route to movie file
app.use('/users', usersRouter);
app.use('/movie', movieRouter);
app.use('/purchase', purchaseRouter)


//this is what starts the server, listen on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
