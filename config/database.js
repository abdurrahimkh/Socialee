const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch(error => {
      console.log(`Error connecting database: ${error}`);
    });
};
