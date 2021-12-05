"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pet = new Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: {
    type: String,
    required: "Kindly enter the name",
  },
  category: {
    type: String,
    required: "Kindly enter the category",
  },
  subcategory: {
    type: String,
  },
  age: {
    type: Number,
    required: "Kindly enter the age",
  },
  about: {
    type: String,
    required: "Kindly enter the about",
  },
  imageUri: {
    type: String,
    required: "Kindly enter the image",
  },
  isInPublish: {
    type: Boolean,
  },
  userId: {
    type: Object,
    required: "Kindly enter the user",
  },
  createDate: {
    type: String,
    required: "Kindly enter the create date",
  },
});

module.exports = mongoose.model("pet", pet);
