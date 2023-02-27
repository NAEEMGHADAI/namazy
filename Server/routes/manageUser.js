const express = require("express");
const router = express.Router();
const registerController = require("../controllers/manageUser");
const ROLES_LIST = require("../config/roles_list");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const upload = require("../middleware/multer");

router.post("/", upload.single("file"), registerController.handleNewUser);
router.post(
  "/adminregister",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  upload.single("file"),
  registerController.handleNewUserByAdmin
);
router.get(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
  registerController.getUser
);
router.put("/:id", upload.single("file"), registerController.updateUser);
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
