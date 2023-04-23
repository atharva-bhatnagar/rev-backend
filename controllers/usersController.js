const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select().lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "duplicate email" });
  }

  const userObject = { email, username, password };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ messgae: `Invalid user data received` });
  }
});
module.exports = {
  getAllUsers,
  createNewUser,
};
