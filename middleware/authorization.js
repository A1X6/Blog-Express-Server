const isAdmin = async (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  } else {
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
};

module.exports = { isAdmin };
