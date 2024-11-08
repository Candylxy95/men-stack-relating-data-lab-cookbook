const express = require("express");
const { viewUsers, viewOneUser } = require("../controllers/users");
const router = express.Router();

router.get("/users", viewUsers);
router.get("/:userId", viewOneUser);

module.exports = router;
