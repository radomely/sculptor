const Goal = require("../models/goalModel");

module.exports.updateTask = (req, res) => {
  const { goalId, tasks } = req.body;
  console.log("tasks:", tasks);
  try {
    tasks.forEach(element => {
      const { taskId, taskTitle } = element;
      console.log(element);
      Goal.findOneAndUpdate(
        { _id: goalId, "goalTasks._id": taskId },
        { $set: { "goalTasks.$.taskTitle": taskTitle } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) console.log(err);
          console.log(doc);
        }
      );
    });
    res.status(200).json({
      message: "Tasks updated!"
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

// // ID елемента массива в цели
// const taskElementId = "5cb5d5611141693db8464864";

// // фильтруем массив и исключаем из него елемент, который равен переданному ID
// const array = findTask.goalTasks.map(el =>
//   String(el._id) === taskElementId
//     ? { ...el, taskTitle: "NEW TITLE "}
//     : el
// );

// findTask.goalTasks = array;
// findTask.save();

// console.log(findTask);

module.exports.addTask = async (req, res) => {
  const goalId = req.body.goalId;
  const task = req.body.task;
  try {
    const updated = await Goal.findByIdAndUpdate(
      goalId,
      { $push: { goalTasks: task } },
      { new: true }
    );
    res.status(200).json({ success: true, message: "UPDATED", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
