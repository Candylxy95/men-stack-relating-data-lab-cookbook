const User = require("../models/Users");

const addItems = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    // if (req.user.username === user.username) {
    const item = { name: req.body.name };
    user.pantry.push(item);
    await user.save();

    res.status(200).json({
      status: "Successful",
      msg: `Item added to ${user.username}'s pantry `,
    });
    // } else {
    //   return res.status(403).json({ msg: "You are unauthorised!!" });
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewItems = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    res.status(200).json({
      status: "Successful",
      msg: `List of items in ${user.username}'s pantry: ${user.pantry}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const deleteItem = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.user.username });
//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }
//     const itemId = req.params.itemId;
//     if (!itemId) {
//       return res.status(400).json({ msg: "Item ID not found" });
//     }
//     user.pantry.pull(itemId);
//     await user.save();
//     res.status(200).json({ msg: "Item successfully removed" });
//   } catch (error) {
//     res.status(500).send("Server error", error.message);
//   }
// };

const deleteItem = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const itemToBeDeleted = user.pantry.find((item) => {
      return item._id == req.params.itemId;
    });
    itemToBeDeleted.deleteOne();
    await user.save();
    res
      .status(200)
      .json({ status: "Successful", msg: `${itemToBeDeleted} is deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const itemToBeUpdated = user.pantry.find((item) => {
      return item._id == req.params.itemId;
    });
    if (!itemToBeUpdated) {
      return res.status(400).json({ msg: "Item ID not found" });
    }
    const prevName = itemToBeUpdated.name;
    itemToBeUpdated.set({ name: req.body.name });
    await user.save();
    res.status(200).json({
      status: "Successful",
      msg: `${prevName} has been updated to ${itemToBeUpdated.name}`,
    });
  } catch (error) {
    res.status(500).send("Server Error", error.message);
  }
};

module.exports = { addItems, viewItems, deleteItem, updateItem };
