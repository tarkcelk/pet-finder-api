const Router = require("express");
const router = Router();
const userController = require("../controllers/user");

router.get("/list", userController.list);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.put("/", userController.update);

module.exports = router;
