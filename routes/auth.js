const { Router } = require("express");
const authControllers = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post("/login", authControllers.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the authenticated user.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", isAuthenticated, authControllers.logout);

/**
 * @swagger
 * /auth/csrf-token:
 *   get:
 *     summary: Get CSRF token
 *     description: Retrieve CSRF token for secure requests.
 *     responses:
 *       200:
 *         description: CSRF token retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 */
router.get("/csrf-token", authControllers.csrfToken);

module.exports = router;
