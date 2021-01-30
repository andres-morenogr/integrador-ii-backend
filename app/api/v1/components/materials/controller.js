const httpStatus = require('http-status');
const util = require('./material');

const get = async (req, res) => {
  try {
    const ans = await util.get(req.query);

    return res
      .status(httpStatus.OK)
      .send(ans);
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

const update = async (req, res) => {
  try {
    const ans = await util.update(req.params.id ,req.body);

    return res
      .status(httpStatus.OK)
      .send(ans);
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const ans = await util.deleteById(req.params.id);

    return res
      .status(httpStatus.OK)
      .send(ans);
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const ans = await util.create(req.body);

    return res
      .status(httpStatus.OK)
      .send(ans);
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' });
  }
};

module.exports = {
  get,
  create,
  update,
  deleteById
};