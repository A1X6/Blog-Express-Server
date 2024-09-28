const { Router } = require("express");
const commentsControllers = require("../controllers/commentsController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

/**
 * @swagger
 * /comments/posts/{id}:
 *   get:
 *     summary: Get comments by post ID
 *     description: Retrieve comments for a specific post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Post not found
 */
router.get("/posts/:id", commentsControllers.getCommentsByPostSlug);

/**
 * @swagger
 * /comments/posts/{id}:
 *   post:
 *     summary: Create a new comment
 *     description: Adds a comment to a specific post.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to add a comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request
 */
router.post("/posts/:id", isAuthenticated, commentsControllers.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     description: Updates a comment by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
router.put("/:id", isAuthenticated, commentsControllers.updateComment);

/**
 * @swagger
 * /comments/{id}:
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
router.delete("/:id", isAuthenticated, commentsControllers.deleteComment);

module.exports = router;
