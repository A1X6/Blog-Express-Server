const { Router } = require("express");
const authControllers = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authentication");

const router = Router();

router.post("/login", authControllers.login);
router.post("/logout", isAuthenticated, authControllers.logout);
router.get("/csrf-token", authControllers.csrfToken);

module.exports = router;
