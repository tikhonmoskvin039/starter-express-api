const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  addTask,
  updateTask,
} = require("../controllers/tasksController");

router.get("/", getAllTasks);
router.post("/addTask", addTask);
router.put("/updateTask/:id", updateTask);

module.exports = router;
