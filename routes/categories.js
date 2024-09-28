const { Router } = require("express");
const categoriesControllers = require("../controllers/categoriesController");

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories.
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
 *                   name:
 *                     type: string
 */
router.get("", categoriesControllers.getAllCategories);

module.exports = router;
