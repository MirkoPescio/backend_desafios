const router = require('express').Router();
const { main, destroy, signIn, signUp } = require('../controllers/controller.js');
const { login, register } = require('../middlewares/auth.js');
const { getRandoms } = require('../utils/randomNumbers.js');


router.get('/', signIn);
router.get('/register', signUp);
router.get('/main', main);
router.get('/api/randoms/', getRandoms);

router.post('/', destroy);
router.post('/registerResult', register);
router.post('/main', login);


module.exports = router;