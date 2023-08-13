const { isvalidObjectId } = require("mongoose");

const isValidContactId = (req, res, next) => {
  const { id } = req.params;

  if (!isvalidObjectId(id)) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  next();
};

module.exports = isValidContactId;
