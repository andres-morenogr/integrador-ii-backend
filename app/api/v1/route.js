const { Router } = require('express');
const { validateToken } = require('../../middleware/authentication');

const router = new Router();

/*
 * References to each resource routers
 */
const signup = require('./components/signup/route');
const login = require('./components/login/route');
const transactions = require('./components/transaction/route');
const projects = require('./components/project/route');
const materials = require('./components/materials/route');

router.use('/auth/login', login);
router.use('/auth/signup', signup);
router.use('/transactions', validateToken, transactions);
router.use('/projects', validateToken, projects);
router.use('/materials', materials);

module.exports = router;
