import { Column, Comment, Project, Task, Work } from "../models/index.js";

export const createProject = async (req, res) => {
  try {
    const { title, dec, img } = req.body;
    const newProject = new Project({
      title,
      dec,
      img,
      userOwner: req.user._id,
    });
    newProject.members.push(req.user._id);
    newProject.admins.push(req.user._id);
    await newProject.save();
    const data = await Column.insertMany([
      { title: "To Do", project: newProject._id },
      { title: "Doing", project: newProject._id },
      { title: "Done", project: newProject._id },
    ]);
    const columnsId = data.map((e) => e._id);
    const updateProject = await Project.findOneAndUpdate(
      { _id: newProject._id },
      {
        columns: columnsId,
        columnOrder: columnsId,
      },
      {
        returnDocument: "after",
      }
    );

    return res.json({
      msg: "Project created successfully",
      project: updateProject,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const data = await Project.find({ members: req.user._id });
    return res.json({
      msg: "Data retrieved successfully.",
      projects: data,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const data = await Project.findOne({ _id: req.params.idProject })
      .populate("columns")
      .populate({
        path: "members",
        select: { email: 1, avatar: 1, username: 1 },
      })
      .populate({
        path: "columns",
        populate: {
          path: "tasks",
          populate: {
            path: "works",
          },
          populate: {
            path: "members",
            select: { avatar: 1 },
          },
        },
      });
    return res.json({
      msg: "Data retrieved successfully.",
      project: data,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const findProject = await Project.findById(req.params.idProject);
    if (!findProject)
      return res.status(400).json({ err: "Invalid project ID" });

    await Project.findOneAndDelete({ _id: req.params.idProject });
    await Column.deleteMany({ project: req.params.idProject });
    const taskData = await Task.find({ project: req.params.idProject });
    const taskArr = taskData.map((el) => `${el._id}`);
    await Task.deleteMany({ project: req.params.idProject });
    await Comment.deleteMany({
      task: {
        $in: taskArr,
      },
    });
    await Work.deleteMany({
      task: {
        $in: taskArr,
      },
    });
    return res.json({
      msg: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const findProject = await Project.findById(req.params.idProject);
    if (!findProject)
      return res.status(400).json({ err: "Invalid project ID" });

    const updateProject = await Project.findOneAndUpdate(
      { _id: req.params.idProject },
      req.body,
      {
        returnDocument: "after",
      }
    )
      .populate("columns")
      .populate({
        path: "members",
        select: { email: 1, avatar: 1, username: 1 },
      })
      .populate({ path: "columns", populate: "tasks" });
    return res.json({
      msg: req.body.columnOrder ? "" : "Data updated successfully.",
      project: updateProject,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
