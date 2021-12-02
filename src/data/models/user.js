"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  nameSurname: {
    type: String,
    required: "Kindly enter the name and surname",
  },
  email: {
    type: String,
    required: "Kindly enter the email",
  },
  password: {
    type: String,
    required: "Kindly enter the password",
  },
});

module.exports = mongoose.model("user", user);
