const mongoose = require("mongoose"),
  user = mongoose.model("user");

exports.list = function (req, res) {
  console.log(req);
  user.find({}, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.create = function (req, res) {
  var newUser = new user(req.body);
  newUser.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.getById = function (req, res) {
  const id = req?.params?.id;
  user.findById(id, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update = function (req, res) {
  user.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};
