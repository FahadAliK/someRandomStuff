const db = require("../models/index");
exports.getTodos = function(req, res) {
  db.Todo.find()
    .then(function(todos) {
      res.json(todos);
    })
    .catch(function(error) {
      console.log(error);
    });
};

exports.createTodo = function(req, res) {
  console.log(req.body);
  db.Todo.create(req.body)
    .then(function(newTodo) {
      res.json(newTodo);
    })
    .catch(function(error) {
      res.send(error);
    });
};

exports.getTodo = function(req, res) {
  db.Todo.findById(req.params.todoID)
    .then(function(foundTodo) {
      res.json(foundTodo);
    })
    .catch(function(error) {
      res.send(error);
    });
};

exports.updateTodo = function(req, res) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoID }, req.body, { new: true })
    .then(function(updatedtodo) {
      res.json(updatedtodo);
    })
    .catch(function(error) {
      res.send(error);
    });
};

exports.deleteTodo = function(req, res) {
  db.Todo.remove({ _id: req.params.todoID })
    .then(function() {
      res.json({ message: "We deletd it.!" });
    })
    .catch(function(error) {
      res.send(error);
    });
};

module.exports = exports;
