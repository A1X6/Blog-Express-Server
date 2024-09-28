const { Router } = require("express");
const repliesControllers = require("../controllers/repliesController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

/**
 * @swagger
 * /replies/comments/{id}:
 *   get:
 *     summary: Get replies by comment ID
 *     description: Retrieve replies for a specific comment by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to retrieve replies for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Comment not found
 */
router.get("/comments/:id", repliesControllers.getRepliesByCommentId);

/**
 * @swagger
 * /replies/comments/{id}:
 *   post:
 *     summary: Create a new reply
 *     description: Adds a reply to a specific comment.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to add a reply to
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
 *         description: Reply created successfully
 *       400:
 *         description: Bad request
 */
router.post("/comments/:id", isAuthenticated, repliesControllers.createReply);

/**
 * @swagger
 * /replies/{id}:
 *   put:
 *     summary: Update a reply
 *     description: Updates a reply by ID.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the reply to update
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
 *         description: Reply updated successfully
 *       404:
 *         description: Reply not found
 */
router.put("/:id", isAuthenticated, repliesControllers.updateReply);

/**
 * @swagger
 * /replies/{id}:
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
router.delete("/:id", isAuthenticated, repliesControllers.deleteReply);

module.exports = router;
