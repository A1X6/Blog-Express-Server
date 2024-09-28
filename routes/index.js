const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const postsRouter = require("./posts");
const categoriesRouter = require("./categories");
const commentsRouter = require("./comments");
const repliesRouter = require("./replies");
const { isAuthenticated } = require("../middleware/authentication");
const { isAdmin } = require("../middleware/authorization");

const router = Router();

router.get("/health-check", (req, res) => {
  res.send("Server is running");
});

router.use("/auth", authRouter);
router.use("/admin", isAuthenticated, isAdmin, adminRouter);
router.use("/posts", postsRouter);
router.use("/categories", categoriesRouter);
router.use("/comments", commentsRouter);
router.use("/replies", repliesRouter);

module.exports = router;
