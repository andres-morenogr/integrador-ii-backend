const Transaction = require("./model");

const create = async (body) => {
  console.log(body);
  const transaction = new Transaction({
    id: body.id,
    projectId: body.projectId,
    description: body.description,
    income: body.income,
    type: body.type,
    value: body.value,
    walletId: body.walletId,
    products: body.products
  });
  return await transaction.save();
}

const get = async (filters) => {
  console.log(filters);
  return await Transaction.find({...filters})
  .sort({ creationDate: -1 })
}

const update = async (id, body) => {
  const transaction = {
    projectId: body.projectId,
    description: body.description,
    income: body.income,
    type: body.type,
    value: body.value,
    walletId: body.walletId,
    products: body.products
  };
  return await Transaction.findByIdAndUpdate(id, deleteEmptyFields(transaction)).exec();
}

const deleteEmptyFields = (object) => {
  Object.keys(object).forEach(field => {
    if (object[field] === null || object[field] === undefined) {
      delete object[field]
    }
  });
  return object;
}

const deleteById = async (id) => {
  return await Transaction.findByIdAndRemove(id).exec();
}

module.exports = {
  create,
  get,
  deleteById,
  update
}