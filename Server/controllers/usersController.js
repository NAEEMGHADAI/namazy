const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(204).json({ message: "No employees found" });
  }
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    res.status(400).json({ message: "ID parameter is required" });
  }
  let user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No Employee matches ID ${req.body.id}.` });
  }

  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID parameter is required" });
  }
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let user = await User.findOne({ _id: req.params.id }).exec();
    console.log(user);
    if (!user) {
      return res
        .status(204)
        .json({ message: `No Employee matches ID ${req.params.id}.` });
    }
    return res.json(user);
  }
  res.status(400).json({ message: "Invalid ID" });
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
