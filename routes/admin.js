const { Router } = require("express");
const postsController = require("../controllers/admin/postsController");
const categoriesController = require("../controllers/admin/categoriesController");
const usersController = require("../controllers/admin/usersController");
const commentsController = require("../controllers/admin/commentsController");
const repliesController = require("../controllers/admin/repliesController");

const router = Router();

/**
 * @swagger
 * /admin/posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 */
router.post("/posts", postsController.createPost);

/**
 * @swagger
 * /admin/posts/{id}:
 *   put:
 *     summary: Update a post
 *     description: Updates a post by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
router.put("/posts/:id", postsController.updatePost);

/**
 * @swagger
 * /admin/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Deletes a post by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/posts/:id", postsController.deletePost);

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post("/categories", categoriesController.createCategory);

/**
 * @swagger
 * /admin/categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Updates a category by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/categories/:id", categoriesController.updateCategory);

/**
 * @swagger
 * /admin/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/categories/:id", categoriesController.deleteCategory);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get("/users", usersController.getAllUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get("/users/:id", usersController.getUserById);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", usersController.deleteUser);

/**
 * @swagger
 * /admin/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete("/comments/:id", commentsController.deleteComment);

/**
 * @swagger
 * /admin/replies/{id}:
 *   delete:
 *     summary: Delete a reply
 *     description: Deletes a reply by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the reply to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reply deleted successfully
 *       404:
 *         description: Reply not found
 */
router.delete("/replies/:id", repliesController.deleteReply);

module.exports = router;
