const { Router } = require("express");
const repliesControllers = require("../controllers/repliesController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

router.get("/comments/:id", repliesControllers.getRepliesByCommentId);
router.post("/comments/:id", isAuthenticated, repliesControllers.createReply);
router.put("/:id", isAuthenticated, repliesControllers.updateReply);
router.delete("/:id", isAuthenticated, repliesControllers.deleteReply);

module.exports = router;
