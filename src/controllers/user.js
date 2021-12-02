const mongoose = require("mongoose"),
  user = mongoose.model("user");

exports.list = function (req, res) {
  user.find({}, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.create = function (req, res) {
  user.findOne({ email: req.body.email }, function (err, doc) {
    if (doc) return res.send({ error: "Email exists , try another email" });

    const newUser = new user(req.body);
    newUser.save(function (err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  });
};

exports.getById = function (req, res) {
  const id = req?.params?.id;
  user.findById(id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
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
