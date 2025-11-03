const db = require('../config/db');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const AuthMiddleware = require('../middleware/middleware');

router.get('/', (req, res) => {
    res.send('Task Route is working');
    
});

router.post("/create", AuthMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await new Task({ title, description });
    newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});


router.get("/all", AuthMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
});


router.put("/update/:id", AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
});

router.delete("/delete/:id", AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }
});

router.post('/assigntask', AuthMiddleware, async (req, res) => {
    const { taskId, userId } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.assignedTo = mongoose.Types.ObjectId(userId);
        await task.save();
        res.status(200).json({ message: "Task assigned successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error assigning task", error: error.message });
    }
});

module.exports = router;
