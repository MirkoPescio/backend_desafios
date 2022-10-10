const router = require('express').Router();
const { form, home, destroy } = require('../controllers/controller.js');
const login = require('../middlewares/auth');

router.get('/', login, form);
router.post('/home', home);
router.post('/', destroy);

module.exports = router;