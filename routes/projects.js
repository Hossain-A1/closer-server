const express = require("express");
const {
  postProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
} = require("../controllers/projects");

const authMiddleware  = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
// get all projects
router.get("/", getProjects);
// get single project
router.get("/:id", getProject);
// post a project
router.post("/", postProject);
// delete project
router.delete("/:id", deleteProject);
// update project
router.patch("/:id", updateProject);

module.exports = router;
