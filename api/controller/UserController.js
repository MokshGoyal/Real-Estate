import Listing from "../models/listingModel.js";
import User from "../models/UserModels.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Hello World" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(
      errorHandler(403, "You don't have permission to update this user")
    );
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  console.log("starting delete user");
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  } else {
    console.log("user is loggedin");
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("user deleted");

    res.clearCookie("acess_token");
    console.log("token deleted");

    res.status(200).json("User deleted successfully");
    console.log("delete user finished");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings"));
  }
};
