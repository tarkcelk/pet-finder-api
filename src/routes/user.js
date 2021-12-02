const Router = require("express");
const router = Router();
const userController = require("../controllers/user");

router.get("/", userController.list);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/", userController.update);

module.exports = router;
