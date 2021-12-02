const mongoose = require("mongoose"),
  pet = mongoose.model("pet"),
  { json } = require("../utils");

exports.list = function (req, res) {
  pet.find({}, function (err, pet) {
    if (err) res.send(err);
    res.json(pet);
  });
};

exports.create = function (req, res) {
  if (!req.file) return res.send({ error: "Pet image must be uploaded" });
  if (!json.isJson(req.body?.pet))
    return res.send({ error: "Values have incorrect format, please fix it" });

  let newPet = new pet(JSON.parse(req.body.pet));
  newPet.imageUri = `/${req.file.path.replace(/\\/g, "/")}`;
  newPet.createDate = new Date().toLocaleDateString("tr-TR");
  newPet.save(function (err, pet) {
    if (err) res.send(err);
    res.json(pet);
  });
};

exports.getById = function (req, res) {
  const id = req?.params?.id;
  pet.findById(id, function (err, pet) {
    if (err) res.send(err);
    res.json(pet);
  });
};

exports.update = function (req, res) {
  pet.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, pet) {
      if (err) res.send(err);
      res.json(pet);
    }
  );
};
