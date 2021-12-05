const Router = require("express");
const router = Router();
const categoryController = require("../controllers/category");

router.get("/", categoryController.list);
router.get("/sub/:categoryId", categoryController.subsCategoriesByCategoryId);

module.exports = router;
