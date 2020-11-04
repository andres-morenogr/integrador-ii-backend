const { Router } = require('express');

const router = new Router();

/*
 * References to each resource routers
 */
const helloWorld = require('./components/hello-world/route');
const signup = require('./components/signup/route');
const signup = require('./components/login/route');

router.use('/hello-world', helloWorld);
router.use('/auth', auth);

module.exports = router;
