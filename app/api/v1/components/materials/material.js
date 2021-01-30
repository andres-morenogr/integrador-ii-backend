const Material = require("./model");

const create = async (body) => {
  console.log(body);
  const material = new Material({
    id: body.id,
    projectId: body.projectId,
    description: body.description,
    type: body.type,
    amount: body.amount,
  });
  return await material.save();
}

const get = async (filters) => {
  console.log(filters);
  return await Material.find({ ...filters })
    .sort({ creationDate: -1 })
}

const update = async (id, body) => {
  const material = {
    projectId: body.projectId,
    description: body.description,
    type: body.type,
    amount: body.amount,
  };
  return await Material.findByIdAndUpdate(id, material).exec();
}

const deleteById = async (id) => {
  return await Material.findByIdAndRemove(id).exec();
}

module.exports = {
  create,
  get,
  update,
  deleteById
}