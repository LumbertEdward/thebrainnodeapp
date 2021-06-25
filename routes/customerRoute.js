var express = require('express');
const { ProductDetails, Products, Login, Register, AddToCart, ViewShoppingCartItems, ViewShoppingCartItemsDetails, RemoveItemFromCart, MakeOrder, ViewMyOrders, MypendingOrders, MyCompletedOrders, showCustomerProfile, UpdateCustomerProfile } = require('../controllers/customer/customercontrollers');
const { route } = require('./farmerroutes');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false })

const path = require('path')
const multer = require('multer')

//profile pics
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/images/profile');
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  })
  
const upload = multer({storage: storage}).single('image')

/* GET users listing. */
router.post('/login', urlencodedParser, Login) //login customer
router.post('/register', upload, urlencodedParser, Register) //register customer
router.get('/:user_id/profile', showCustomerProfile) //show profile
router.get('/:user_id/profile/update', upload, urlencodedParser, UpdateCustomerProfile) //update profile

/* GET PRODUCTS */
router.get('/products', Products) //view products
router.get('/products/:product_id/', ProductDetails) //view product details

/* shopping cart */
router.get('/products/:product_id/:farmer_id/:userId/shoppingcart/add/', AddToCart) //add to cart
router.get('/products/:user_id/shoppingcart', ViewShoppingCartItems) //view shopping cart
router.get('/products/:user_id/shoppingcart/:cart_item_id/details', ViewShoppingCartItemsDetails) //view cart item details
router.get('/products/:user_id/shoppingcart/:cart_item_id/delete', RemoveItemFromCart) //delete cart item
/* orders */
router.post('/products/:product_id/order/:user_id/', urlencodedParser, MakeOrder) //make order
router.get('/products/:user_id/orders', ViewMyOrders) //view orders
router.get('/products/:user_id/pendingorders', MypendingOrders) //pending orders
router.get('/products/:user_id/completeorders', MyCompletedOrders) //complete orders

module.exports = router;
