function authorizeRoles(authRole) {
  return (req, res, next) => {
    // debbing log
    console.log("Auth Role: ", authRole);
    console.log("User Role: ", req.user.role);

    if (!req.user || !authRole.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: "You don have permmision, to access this page" });
    }

    next();
  };
}

module.exports = { authorizeRoles };
