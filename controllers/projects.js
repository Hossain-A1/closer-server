const mongoose = require("mongoose");
const Project = require("../models/project");

// get all projects============================
const getProjects = async (req, res) => {
  const { project } = req.body;

  const projects = await Project.find({ project }).sort({ createdAt: -1 });
  if (!projects) {
    throw Error("Projects not found.");
  }
  res.status(200).json(projects);
};

// get single project===========================
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid id");
    }
    const project = await Project.findById(id);
    if (!project) {
      throw Error("Project not found.");
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// post a project===============================
const postProject = async (req, res) => {
  const { title, tech, budget, manager, duration, dev } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!tech) {
    emptyFields.push("tech");
  }
  if (!budget) {
    emptyFields.push("budget");
  }
  if (!manager) {
    emptyFields.push("manager");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if (!dev) {
    emptyFields.push("dev");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields.", emptyFields });
  }

  try {
    const project = await Project.create({
      ...req.body,
    });
    if (!project) {
      throw Error("Project not found");
    }
    res.status(200).json(project);
  } catch (er) {
    res.status(400).json({ error: err.message });
  }
};
// delete a project================================
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid id");
    }
    const project = await Project.findOneAndDelete({ _id: id });
    if (!project) {
      throw Error("Project not found.");
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  const { title, tech, budget, manager, duration, dev } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!tech) {
    emptyFields.push("tech");
  }
  if (!budget) {
    emptyFields.push("budget");
  }
  if (!manager) {
    emptyFields.push("manager");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if (!dev) {
    emptyFields.push("dev");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields.", emptyFields });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid id.");
    }
    const project = await Project.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!project) {
      throw Error("Project not found.");
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  postProject,
  deleteProject,
  updateProject,
};
