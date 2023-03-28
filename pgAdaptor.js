const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://mongo:27017/expressmongo", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", User);
