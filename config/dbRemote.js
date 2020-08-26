const mongoose = require("mongoose");
const keys = require('./keys')

const dbConnect = () => {
  mongoose
    .connect(keys.mongodb.dbURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
};

module.exports = dbConnect;
