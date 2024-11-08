const express = require("express");
const {
  addItems,
  viewItems,
  deleteItem,
  updateItem,
} = require("../controllers/foods");
const User = require("../models/Users");
const router = express.Router();

router.post("/", addItems);
router.get("/", viewItems);
router.delete("/:itemId", deleteItem);
router.post("/:itemId", updateItem);

module.exports = router;
