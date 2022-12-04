const router = require('express').Router();
const { main, destroy, signIn, signUp } = require('../controllers/controller.js');
const { login, register } = require('../middlewares/auth.js');
const chatController = require('../controllers/chatController.js')
const productController = require('../controllers/productController.js')
const { getRandoms } = require('../utils/randomNumbers.js');


router.get('/', signIn);
router.get('/register', signUp);
router.get('/main', main);
router.get('/api/randoms/', getRandoms);

router.post('/chat/', chatController.postMessage)
router.get('/chat/test/normalized', chatController.getTestMessages)
router.post('/products/', productController.postProduct)
router.get('/products/test', productController.getProductsTest)

router.post('/api/products/', productController.postProduct)
router.get('/api/products/test', productController.getProductsTest)
router.get('/api/products', productController.getProducts)
router.delete('/api/products/:id', productController.deleteProduct)
router.put('/api/products', productController.updateProduct)

router.post('/', destroy);
router.post('/registerResult', register);
router.post('/main', login);


module.exports = router;