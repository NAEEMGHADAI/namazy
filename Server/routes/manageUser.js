const express = require("express");
const router = express.Router();
const registerController = require("../controllers/manageUser");
const ROLES_LIST = require("../config/roles_list");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.post("/", registerController.handleNewUser);
router.delete(
  "/:user",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.deleteUser
);
router.put("/changePassword", registerController.changePassword);
router.patch(
  "/verify",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.verifyUser
);

module.exports = router;
