const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .send(
          "Access denied. You do not have permission to perform this action."
        );
    }

    next();
  };
};

module.exports = authRole;
