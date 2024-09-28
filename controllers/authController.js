const dotenv = require("dotenv");
const admin = require("../config/firebase.js");
const { PrismaClient } = require("@prisma/client");
const redisClient = require("../config/redisClient.js");

dotenv.config();
const prisma = new PrismaClient();

exports.login = async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized - Missing Token" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid Token Format" });
  }
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (!decodedValue) {
      return res.status(403).json({ message: "Forbidden - Invalid Token" });
    }

    let user = await prisma.user.findUnique({
      where: { googleId: decodedValue.uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: decodedValue.uid,
          email: decodedValue.email,
          name: decodedValue.name || "",
          image: decodedValue.picture || null,
          role:
            decodedValue.email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER",
        },
      });
    } else {
      user = await prisma.user.update({
        where: { googleId: decodedValue.uid },
        data: {
          name: decodedValue.name || user.name,
          image: decodedValue.picture || user.image,
          role:
            decodedValue.email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER",
        },
      });
    }

    if (decodedValue.email === process.env.ADMIN_EMAIL) {
      req.session.isAdmin = true;
    }

    req.session.user = {
      id: user.id,
      uid: decodedValue.uid,
      email: decodedValue.email,
      isAdmin: req.session.isAdmin || false,
    };

    return res.status(200).json({
      message: "Login successful",
      isAdmin: req.session.isAdmin || false,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error - Invalid Token" });
  }
};

exports.logout = (req, res) => {
  const sessionID = req.sessionID;
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    redisClient.del(`Blog:${sessionID}`, (err, response) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to remove session from Redis" });
      }
    });
    res.clearCookie("connect.sid");
    res.clearCookie("_csrf");
    res.status(200).json({ message: "Logout successful" });
  });
};

exports.csrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};
