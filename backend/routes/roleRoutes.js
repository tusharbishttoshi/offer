const express = require("express");
const {
    addRole, getRole, deleteRole, updateRole
} = require("../controllers/roleController");

const router = express.Router();

router.route("/role").get(getRole).post(addRole).put(updateRole)
router.route("/role/:id").delete(deleteRole)

module.exports = router;