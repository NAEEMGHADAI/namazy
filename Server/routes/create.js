const express = require("express");
const router = express.Router();
const registerController = require("../controllers/createUser");
const ROLES_LIST = require("../config/roles_list");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.post("/", registerController.handleNewUser);
router.patch(
  "/verify",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.verifyUser
);

module.exports = router;
