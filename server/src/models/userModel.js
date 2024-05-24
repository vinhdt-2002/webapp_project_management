import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 25,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4D5jth4fm4GE7ut7lWW-04lnDO2OkD-sg&s",
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "projects",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
