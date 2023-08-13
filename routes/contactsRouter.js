const express = require("express");
const authentificate = require("../middlewares/authentificate");
const isValidContactId = require("../middlewares/isvalidContactId");

const { getAll, deleteById } = require("../controllers/contactController");

const router = express.Router();

router.get("/", authentificate, getAll);

router.post("/");

router.delete("/:contactId", authentificate, isValidContactId, deleteById);

module.exports = router;
