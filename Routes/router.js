const express = require("express");

const userController = require("../Controllers/userController");

const projectController = require("../Controllers/projectController");

const multerConfig = require("../Middlewares/multerMiddleware");

const jwtMiddleware = require("../Middlewares/jwtMiddleware");

//create router object of express of express to define path
const router = new express.Router();

//using router object  to define path

//register API path= https://loaclhost:4000/register=frontend->
router.post("/register", userController.register);

//login API path= https://loaclhost:4000/register=frontend->
router.post("/login", userController.login);

//add user project

router.post(
  "/project/add",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.addUserProject
);

//get user-prjects
router.get(
  "/project/all-user-projects",
  jwtMiddleware,
  projectController.getAllUserProjects
);

//get all project
router.get(
  "/project/all-project",
  jwtMiddleware,
  projectController.getAllprojects
);

//get home project
router.get("/project/home-project", projectController.getHomeProject);

//update project
router.put(
  "/project/project-update/:pid",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.updateProject
);

//delete project
router.delete("/project/delete-project/:pid",jwtMiddleware,projectController.deleteProject);

module.exports = router;
