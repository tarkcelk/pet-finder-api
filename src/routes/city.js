const Router = require("express");
const router = Router();
const cityController = require("../controllers/city");

router.get("/", cityController.list);

module.exports = router;
