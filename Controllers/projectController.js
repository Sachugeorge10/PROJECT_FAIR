const projects = require("../Models/projectSchema");

// add project
exports.addUserProject = async (req, res) => {
  console.log("inside add project");

  // get userid
  const userId = req.payload;
  //get project image
  // -------------------------------
  const projectImage = req.file.filename;
  //get project details
  const { title, language, github, link, overview } = req.body;

  console.log(userId, title, language, github, link, overview, projectImage);

  //logic for adding project

  // res.status(200).json("add user req received")

  try {
    const existingUser = await projects.findOne({ github });
    if (existingUser) {
      res.status(402).json("project already exist");
    } else {
      //adding new project
      const newProject = new projects({
        title,
        language,
        github,
        link,
        overview,
        projectImage,
        userId,
      });
      await newProject.save(); // save to mongo db
      res.status(200).json(newProject); // response to the client
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//get user-project

exports.getAllUserProjects = async (req, res) => {
  //get user id
  const userId = req.payload;
  // get all projects of particular user

  try {
    const userProject = await projects.find({ userId });
    res.status(200).json(userProject); // send all user project
  } catch (err) {
    res.status(401).json("internal server error" + err.message);
  }
};

//get all project
exports.getAllprojects = async (req, res) => {
  const searchKey=req.query.search
  const query={
    language:{$regex:searchKey,
      $options:"i"
    
    }
  }
  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects); // send all  project
  } catch (err) {
    res.status(401).json("internal server error" + err.message);
  }
};

//get home projects(marquee)
exports.getHomeProject = async (req, res) => {
  try {
    const homeProject = await projects.find().limit(3);
    res.status(200).json(homeProject); // send 3 home  project
  } catch (err) {
    res.status(401).json("internal server error" + err.message);
  }
};

//update project details
exports.updateProject = async (req, res) => {
  const { title, language, github, link, overview, projectImage } = req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  userId = req.payload;
  const { pid } = req.params;
  try {
    //find the particular project and updatea then save to mongo db
    const updateProject = await projects.findByIdAndUpdate(
      { _id: pid },
      {
        title,
        language,
        github,
        link,
        overview,
        projectImage: uploadImage,
        userId,
      }
    );

    // save project to mongo dm
    await updateProject.save();

    //response back to client
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json("internal server error" + err.message);
  }
};

//delte the project

exports.deleteProject = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteUserProject = await projects.findOneAndDelete({ _id: pid });
    res.status(200).json(deleteUserProject);
  } catch (err) {
    res.status(401).json("internal server error" + err.message);
  }
};
