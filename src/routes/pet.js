const Router = require("express");
const router = Router();
const petController = require("../controllers/pet");
const {
  multer: { upload },
} = require("../utils");

router.get("/", petController.list);
router.get("/userPets", petController.userPets);
router.get("/userFavorites/", petController.userFavorites);
router.get("/:id", petController.get);
router.post("/", upload.single("file"), petController.create);
router.put("/", petController.update);
router.put("/addToFavorites/", petController.addToFavorites);

module.exports = router;
