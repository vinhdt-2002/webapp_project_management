import { User } from "../models/index.js";

export const updateProfile = async (req, res) => {
  try {
    if (req.params.id !== `${req.user._id}`)
      return res.status(400).json({
        err: "User does not have permission to change another user's profile",
      });

    const findUser = await User.findOne({ username: req.body.username });
    if (findUser)
      return res.status(400).json({ err: "Username is already taken." });

    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        avatar: req.body.avatar,
        username: req.body.username,
      },
      {
        returnDocument: "after",
      }
    );

    return res.json({
      msg: "Profile updated successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
