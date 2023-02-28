const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id").get(usersController.getUser);

module.exports = router;
