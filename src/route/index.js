const express = require("express");
const { route } = require("../../app");
const Controller = require("../controller/indexController");
const router = express.Router();

// todo-items
router.get("/",(req,res) => res.send("Respon node js testing"))
router.get("/todo-items", Controller.Todolist.getTodoList)
router.get("/todo-items/:id", Controller.Todolist.getSpesificTodoList)
router.post("/todo-items", Controller.Todolist.saveTodoList)
router.patch('/todo-items/:id',Controller.Todolist.updateTodoList)
router.delete('/todo-items/:id',Controller.Todolist.deleteTodoList)

// activity-groups
router.get("/activity-groups", Controller.Activitygroup.getActivityGroup)
router.get("/activity-groups/:id", Controller.Activitygroup.getSpesificGroup)
router.post("/activity-groups", Controller.Activitygroup.saveActivityGroup)
router.patch('/activity-groups/:id',Controller.Activitygroup.updateActivityGroup)
router.delete('/activity-groups/:id',Controller.Activitygroup.deleteActivityGroup)
module.exports = router;