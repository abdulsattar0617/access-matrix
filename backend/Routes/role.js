const express = require("express");
const router = express.Router();

const RoleModel = require("../Models/role");

router
  .route("/:id")

  // delete
  .delete(async (req, res) => {
    try {
      let { id } = req.params;

      let role = await RoleModel.findByIdAndDelete(id);

      if (!role) {
        res.json({
          message: "Deletion failed! No role found for the ID : " + id,
        });
      } else {
        res.json({ message: "Success! Role deleted successfully." });
      }
    } catch (err) {
      res.send(err);
    }
  })

  // view role (GET)
  .get(async (req, res) => {
    try {
      let { id } = req.params;

      let role = await RoleModel.findById(id);

      if (role) {
        res.send(role);
      } else {
        res.json({ message: "No role found for the ID : " + id });
      }
    } catch (err) {
      res.send(err);
    }
  })

  // update
  .patch(async (req, res) => {
    try {
      let { id } = req.params;

      let { title, permissions, otherPermissions = [] } = req.body;

      let role = await RoleModel.findById(id);

      if (!role) {
        res.json({ message: "No role found for the ID : " + id });
      }

      if (!title || !permissions) {
        res.json({
          message: "Please send the title and permissions for the role!",
        });
      }

      permissions.read = permissions.read?.toLowerCase?.() === "true";
      permissions.write = permissions.write?.toLowerCase?.() === "true";

      let roleToUpdate = { title, permissions, otherPermissions };

      let updatedRole = await RoleModel.findByIdAndUpdate(id, roleToUpdate, {
        new: true,
      });

      console.log(updatedRole);
      res.json({ message: "Success! Role updated successfully." });
    } catch (err) {
      res.send(err);
    }
  });

router
  .route("/")

  // CREATE
  .post(async (req, res) => {
    // TODO : complete the method

    let { title, permissions, otherPermissions = [] } = req.body;

    console.log(title);

    permissions.read = permissions.read?.toLowerCase?.() === "true";
    permissions.write = permissions.write?.toLowerCase?.() === "true";

    let role = {
      title,
      permissions,
      otherPermissions,
    };

    let newRole = new RoleModel(role);
    console.log(newRole);

    await newRole.save();

    res.json({ message: "Success! New role saved." });
  })

  .get(async (req, res) => {
    let allRoles = await RoleModel.find({});
    res.status(200).send(allRoles);
  });

module.exports = router;
