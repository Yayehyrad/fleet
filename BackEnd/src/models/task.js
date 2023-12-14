const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  desc: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Task;
