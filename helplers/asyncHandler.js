module.exports = function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((data) => {
        if (data) {
          res.status(201).json({
            success: true,
            message: "User created successfully",
            data: data,
          });
        }
      })
      .catch(next);
  };
};
