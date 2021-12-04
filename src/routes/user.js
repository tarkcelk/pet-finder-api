const Router = require("express");
const router = Router();
const userController = require("../controllers/user");

router.get("/", userController.list);
router.post("/", userController.create);
router.put("/", userController.update);
router.get("/:id", userController.getById);
router.post("/login", userController.login);

module.exports = router;
