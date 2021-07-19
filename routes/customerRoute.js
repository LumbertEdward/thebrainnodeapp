var express = require('express');
const { ProductDetails, Products, ProductType, GoogleUserRegister, AddNotification, viewNotification, GoogleLogin, Login, Register, AddToCart, OrderProducts, AddOrderProducts, ViewShoppingCartItems, ViewShoppingCartItemsDetails, RemoveItemFromCart, MakeOrder, ViewMyOrders, MypendingOrders, MyCompletedOrders, showCustomerProfile, UpdateCustomerProfile, showAllTheCustomers } = require('../controllers/customer/customercontrollers');
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
  
const upload = multer({storage: storage}).single('file')

/* GET users listing. */
router.post('/login', Login) //login customer
router.post('/googleLogin', GoogleLogin) //google login
router.post('/register', Register) //register customer
router.post('/googleRegister', GoogleUserRegister) //register google users
router.get('/:user_id/profile', showCustomerProfile) //show profile
router.get('/:user_id/profile/update', upload, UpdateCustomerProfile) //update profile
router.get('/all', showAllTheCustomers)

/* GET PRODUCTS */
router.get('/products', Products) //view products
router.get('/products/type', ProductType) //view by type
router.get('/products/:product_id/', ProductDetails) //view product details

/* shopping cart */
router.post('/products/:product_id/:farmer_id/:userId/shoppingcart/add/', AddToCart) //add to cart
router.get('/products/:user_id/shoppingcart', ViewShoppingCartItems) //view shopping cart
router.get('/products/:user_id/shoppingcart/:cart_item_id/details', ViewShoppingCartItemsDetails) //view cart item details
router.get('/products/:user_id/shoppingcart/:cart_item_id/delete', RemoveItemFromCart) //delete cart item
/* orders */
router.post('/products/order/:user_id/', MakeOrder) //make order
router.get('/products/:user_id/orders', ViewMyOrders) //view orders
router.get('/products/:user_id/pendingorders', MypendingOrders) //pending orders
router.get('/products/:user_id/completeorders', MyCompletedOrders) //complete orders
router.get('/products/:order_id/orders/vieworderproducts', OrderProducts) //view order products
router.post('/products/checkout', AddOrderProducts) // add order products

//notifications
router.post('/notifications', AddNotification) //add notification
router.get('/notifications/:user_id', viewNotification) //view user notification

module.exports = router;
