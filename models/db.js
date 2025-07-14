const mongoose = require("mongoose");

const mongo_url = process.env.DB_Connection;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("DataBase Connected ");
  })
  .catch((err) => {
    console.log("DataBase Connected Error: ", err);
  });
