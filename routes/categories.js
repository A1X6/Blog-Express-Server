const { Router } = require("express");
const categoriesControllers = require("../controllers/categoriesController");

const router = Router();

router.get("", categoriesControllers.getAllCategories);

module.exports = router;
