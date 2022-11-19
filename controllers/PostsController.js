exports.getAll = (req, res) => {
  res.send("ALL POSTS");
};

exports.getOne = (req, res) => {
  res.send("ONE POST");
};

exports.create = (req, res) => {
  res.send("Create POST");
};

exports.updateOne = (req, res) => {
  res.send("Update One POST");
};

exports.delete = (req, res) => {
  res.send("Delete One POST");
};
