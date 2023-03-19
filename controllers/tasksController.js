const { Task } = require("../db/models");
require("dotenv").config();

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ raw: true });
    res.json({ tasks });
  } catch (error) {
    console.log("error", error);
  }
};

exports.addTask = async (req, res) => {
  const { name, email, text } = req.body;
  try {
    const task = await Task.create({ name, email, text });
    res.json({ task });
  } catch (error) {
    console.log("error", error);
  }
};

exports.updateTask = async (req, res) => {
  const { name, email, text } = req.body;
  try {
    if (req.session.user === undefined) {
      return res
        .status(400)
        .json({ message: "You are not authorize in app, please log in" });
    }
    if (!name || !email || !text) {
      const task = await Task.findOne({ where: { id: req.params.id } });
      task.isDone = !task.isDone;
      task.save();

      res.json({ task });
    } else {
      const task = await Task.findOne({ where: { id: req.params.id } });
      task.name = name;
      task.email = email;
      task.text = text;
      task.isChanged = true;
      task.save();

      res.json({ task });
    }
  } catch (err) {
    console.log("err", err);
  }
};
