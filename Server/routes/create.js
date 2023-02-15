const express = require("express");
const router = express.Router();
const registerController = require("../controllers/createUser");

router.post("/", registerController.handleNewUser);
router.post("/verify", registerController.verifyUser);

module.exports = router;
