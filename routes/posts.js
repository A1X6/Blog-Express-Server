const { Router } = require("express");
const postsControllers = require("../controllers/postsController");

const router = Router();

router.get("", postsControllers.getAllPosts);
router.get("/:id", postsControllers.getPostById);


module.exports = router;
