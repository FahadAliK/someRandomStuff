const express = require("express");
const router = express.Router();
const db = require("../models/index");
const helpers = require("../helpers/todo");
router
  .route("/")
  .get(helpers.getTodos)
  .post(helpers.createTodo);
router
  .route("/:todoID")
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
