const taskModel = require("../models/task.models");

exports.getAll = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    return res.send(tasks);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
};

exports.create = async (req, res) => {
  const { title, day, reminder } = req.body;
  try {
    if (title === undefined || day === undefined || reminder === undefined) {
      return res.status(422).send({ msg: "Field required" });
    }
    const tasks = await taskModel.create({
      title: title,
      day: day,
      reminder: reminder,
    });

    return res.status(201).send(tasks);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) {
      return res.status(422).send({ msg: "Field required" });
    }

    const task = await taskModel.findOne({ _id: id });

    if (!task) {
      return res.status(404).send({ msg: "Data tidak ditemukan" });
    }

    return res.send(task);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.deleteOne({ _id: id });
    if (task.deletedCount === 0) {
      return res.status(404).send({ msg: "Data tidak ditemukan" });
    }

    return res.send({ msg: "Sukses" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;

  const { title, day, reminder } = req.body;

  try {
    if (title === undefined || day === undefined || reminder === undefined) {
      return res.status(422).send({ msg: "Field required" });
    }
    const tasks = await taskModel.updateOne(
      { _id: id },
      {
        title: title,
        day: day,
        reminder: reminder,
      }
    );

    if (tasks.nModified === 0) {
      return res.status(404).send({ msg: "Data tidak ditemukan" });
    }

    return res.send({ msg: "Sukses" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
};
