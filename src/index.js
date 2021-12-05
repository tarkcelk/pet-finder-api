const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/petfinder");
require("./data/models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/api/user", routes.User);
app.use("/api/pet", routes.Pet);
app.use("/api/city", routes.City);
app.use("/api/category", routes.Category);
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`api is running on port:${PORT}`));
