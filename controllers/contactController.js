const Contact = require("../db/models/contactModel");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find({ owner });

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll,
  deleteById,
};
