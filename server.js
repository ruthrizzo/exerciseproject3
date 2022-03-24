const express = require ('express');
const cors = require ('cors'); 
const mongoose = require('mongoose');

require ('dotenv').config();

const app = express ();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect("mongodb+srv://ruthrizzo:projectofinal2022@cluster0.aibcc.mongodb.net/finalProject?retryWrites=true&w=majority")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const exercisesRouter = require ('./routes/exercises');
const usersRouter = require ('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
