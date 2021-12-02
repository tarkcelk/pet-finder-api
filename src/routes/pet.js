const Router = require("express");
const router = Router();
const petController = require("../controllers/pet");
const {
  multer: { upload },
} = require("../utils");

router.get("/", petController.list);
router.post("/", upload.single("file"), petController.create);
router.get("/:id", petController.getById);
router.put("/", petController.update);

module.exports = router;
