const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyJWT, verifyRoles(ROLES_LIST.Admin), createNewEmployee)
  .put(verifyJWT, verifyRoles(ROLES_LIST.Admin), updateEmployee)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
