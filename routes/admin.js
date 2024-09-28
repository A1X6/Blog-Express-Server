const { Router } = require("express");
const postsController = require("../controllers/admin/postsController");
const categoriesController = require("../controllers/admin/categoriesController");
const usersController = require("../controllers/admin/usersController");
const commentsController = require("../controllers/admin/commentsController");
const repliesController = require("../controllers/admin/repliesController");

const router = Router();

router.post("/posts", postsController.createPost);
router.put("/posts/:id", postsController.updatePost);
router.delete("/posts/:id", postsController.deletePost);

router.post("/categories", categoriesController.createCategory);
router.put("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);

router.get("/users", usersController.getAllUsers);
router.get("/users/:id", usersController.getUserById);
router.delete("/users/:id", usersController.deleteUser);

router.delete("/comments/:id", commentsController.deleteComment);

router.delete("/replies/:id", repliesController.deleteReply);

module.exports = router;
