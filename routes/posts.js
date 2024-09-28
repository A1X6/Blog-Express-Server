const { Router } = require("express");
const postsControllers = require("../controllers/postsController");

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve all posts.
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
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get("", postsControllers.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Post not found
 */
router.get("/:id", postsControllers.getPostById);


module.exports = router;
