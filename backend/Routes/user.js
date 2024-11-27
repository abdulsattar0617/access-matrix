const express = require("express");
const router = express.Router();

const UserModel = require("../Models/user");

router
  .route("/:id")

  // delete
  .delete(async (req, res) => {
    let { id } = req.params;

    if (!isUserExist(id)) {
      return res
        .status(404)
        .json({ message: "Failed! No user found for the ID " + id });
    }

    let deletedUser = await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Success! User deleted successfully." });
  })

  // update
  .patch(async (req, res) => {
    let { id } = req.params;
    let { user } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Failed! Please send the user data" });
    }

    console.log(user);
    // if (isUserExist(id)) {
    //   return res
    //     .status(404)
    //     .json({ message: "Failed! No user found for the ID " + id });
    // }

    user.isActive = user.isActive?.toLowerCase?.() === "true";
    

    let updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    // console.log(updatedUser);

    res.status(200).send(updatedUser);
  })

  // view user
  .get(async (req, res) => {
    let { id } = req.params;

    let user = await UserModel.findById(id).populate("roleId").exec();

    if (!user) {
      return res
        .status(404)
        .json({ message: "Failed! No user found with the ID: " + id });
    }

    res.status(200).send(user);
  });

router
  .route("/")

  // all users
  .get(async (req, res) => {
    let allUsers = await UserModel.find({});
    res.send(allUsers);
  })

  // create
  .post(async (req, res) => {
    let { user } = req.body;

    // console.log(user);

    user.isActive = user.isActive?.toLowerCase?.() === "true";
    let newUser = new UserModel(user);

    await newUser.save();

    res.json({ message: "Success! New user created." });
  });

const isUserExist = async (id) => {
  if (id) {
    let user = await UserModel.findById(id);
    if (!user) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

module.exports = router;
