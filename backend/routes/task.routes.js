const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.constrollers");

// @route GET /task
router.route("/").get(taskController.getAll).post(taskController.create);

router
  .route("/:id")
  .get(taskController.getOne)
  .delete(taskController.delete)
  .put(taskController.update);

module.exports = router;
