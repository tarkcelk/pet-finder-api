const { cities } = require("../constants");

exports.list = function (req, res) {
  res.json(cities);
};
