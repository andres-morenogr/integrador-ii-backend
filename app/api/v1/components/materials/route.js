const { Router } = require('express');
const controller = require('./controller');

const router = new Router();

router.route('/')
  .post((req, res) => controller.create(req, res));

router.route('/')
  .get((req,res) => controller.get(req, res));

router.route('/:id')
  .delete((req, res) => controller.deleteById(req, res));

router.route('/:id')
  .put((req, res) => controller.update(req, res));


module.exports = router;