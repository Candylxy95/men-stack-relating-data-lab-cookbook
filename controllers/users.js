const User = require("../models/Users");

const viewUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(200).json({ msg: "no users currently" });
    }

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ msg: "user id not found" });
    }
    res.status(200).json({ user: user.username, pantry: user.pantry });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = { viewUsers, viewOneUser };
