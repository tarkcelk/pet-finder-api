const mongoose = require("mongoose"),
  pet = mongoose.model("pet"),
  user = mongoose.model("user"),
  mongodb = require("mongodb"),
  { json } = require("../utils"),
  { categories, sub_categories, cities } = require("../constants");

exports.list = function (req, res) {
  const { searchText, category } = req.query;
  let filter = { isInPublish: true };
  if (searchText)
    filter = { ...filter, name: { $regex: searchText, $options: "i" } };
  if (parseInt(category) > 0) filter = { ...filter, category: category };
  pet.find(filter, function (err, pet) {
    if (err) res.send(err);
    res.json(pet);
  });
};

exports.create = function (req, res) {
  if (!req.file) return res.send({ error: "Pet image must be uploaded" });
  if (!json.isJson(req.body?.pet))
    return res
      .status(406)
      .send({ error: "Values have incorrect format, please fix it" });
  pet.init();
  let newPet = new pet(JSON.parse(req.body.pet));
  newPet._id = new mongodb.ObjectId();
  newPet.imageUri = `/pet_images/${req.file.filename}`;
  newPet.createDate = new Date().toLocaleDateString("tr-TR");
  newPet.isInPublish = true;
  newPet.save(function (err, pet) {
    if (err) res.send(err);
    res.json(pet);
  });
};

exports.get = function (req, res) {
  pet.findById(req?.params?.id, async function (err, pet) {
    if (err) res.send(err);
    user.findById(pet.userId, function (errUser, petOwner) {
      if (errUser) return {};
      const petDto = {
        name: pet.name,
        category: categories.find(
          (category) => category.value === parseInt(pet.category)
        ).label,
        subcategory: sub_categories.find(
          (s_category) => s_category.value === pet.subCategory
        )?.label,
        age: pet.age,
        city: cities.find((city) => city.value === petOwner.city_id).label,
        about: pet.about,
        owner: `${petOwner.name} ${petOwner.surname}`,
        phone_number: petOwner.phone_number,
        image_uri: pet.imageUri,
      };
      res.json(petDto);
    });
  });
};

exports.update = function (req, res) {
  pet.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    function (err, pet) {
      if (err) res.send(err);
      res.json(pet);
    }
  );
};

exports.userPets = function (req, res) {
  const { userId } = req.query;
  pet.find({ userId: userId }, function (err, pets) {
    if (err) res.status(404).send(err);
    res.json(pets);
  });
};

exports.addToFavorites = function (req, res) {
  const { userId, petId } = req.body;
  user.findById(userId, function (err, foundUser) {
    if (err) return res.status(404).send(err);
    !foundUser.favorites.some((item) => item === petId) &&
      foundUser.favorites.push(petId);
    user.findOneAndUpdate(
      { _id: userId },
      foundUser,
      { new: true },
      function (errUserSave, updatedUser) {
        if (errUserSave) return res.status(406).send(errUserSave);
        res.json(updatedUser);
      }
    );
  });
};

exports.userFavorites = function (req, res) {
  const { userId } = req.query;
  user.findById(userId, function (errUser, foundUser) {
    if (errUser) res.status(404).send(errUser);
    const favorites = foundUser.favorites;
    pet.find({ _id: { $in: favorites } }, function (err, pets) {
      if (err) res.status(404).send(err);
      res.json(pets);
    });
  });
};
