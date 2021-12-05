const mongoose = require("mongoose"),
  user = mongoose.model("user"),
  mongodb = require("mongodb"),
  { apiResponse } = require("../utils");

exports.list = function (req, res) {
  user.find({}, function (err, task) {
    if (err) res.status(406).send(err);
    res.json(task);
  });
};

exports.create = function (req, res) {
  user.findOne({ email: req.body.email }, function (err, doc) {
    if (doc)
      return res
        .status(406)
        .send(
          apiResponse.onError(
            "Bu email sistemde kayıtlı, lütfen başka bir email deneyiniz."
          )
        );

    const newUser = new user(req.body);
    newUser._id = new mongodb.ObjectId();
    newUser.save(function (err, user) {
      if (err) res.status(400).send(err);
      console.log(err);
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

exports.login = function (req, res) {
  const { email, password } = req.body;
  user.findOne({ email, password }, function (err, user) {
    if (err) return res.send(err);
    if (!user)
      return res
        .status(404)
        .send(apiResponse.onError("Email veya şifre yanlış tekrar deneyiniz."));
    res.json(user);
  });
};
