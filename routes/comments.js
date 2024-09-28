const { Router } = require("express");
const commentsControllers = require("../controllers/commentsController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

router.get("/posts/:id", commentsControllers.getCommentsByPostSlug);
router.post("/posts/:id", isAuthenticated, commentsControllers.createComment);
router.put("/:id", isAuthenticated, commentsControllers.updateComment);
router.delete("/:id", isAuthenticated, commentsControllers.deleteComment);

module.exports = router;
