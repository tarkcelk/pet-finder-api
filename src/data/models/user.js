"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  // _id: Object,
  name: {
    type: String,
    required: "Kindly enter the name",
  },
  surname: {
    type: String,
    required: "Kindly enter the surname",
  },
  email: {
    type: String,
    required: "Kindly enter the email",
  },
  password: {
    type: String,
    required: "Kindly enter the password",
  },
  phone_number: {
    type: String,
    required: "Kindly enter the phone number",
  },
  city_id: {
    type: Number,
    required: "Kindy enter the city",
  },
});

module.exports = mongoose.model("user", user);
