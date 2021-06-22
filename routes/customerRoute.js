var express = require('express');
const { ProductDetails, Products, Login, Register, AddToCart, ViewShoppingCartItems, ViewShoppingCartItemsDetails, RemoveItemFromCart, MakeOrder, ViewMyOrders, MypendingOrders, MyCompletedOrders, showCustomerProfile } = require('../controllers/customer/customercontrollers');
const { route } = require('./farmerroutes');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false })

/* GET users listing. */
router.post('/login', urlencodedParser, Login) //fine
router.post('/register', urlencodedParser, Register) //fine
router.get('/:user_id/profile', showCustomerProfile) //fine

/* GET PRODUCTS */
router.get('/products', Products) //fine
router.get('/products/:product_id/', ProductDetails) //fine

/* shopping cart */
router.get('/products/:product_id/:farmer_id/:userId/shoppingcart/add/', AddToCart) //fine
router.get('/products/:user_id/shoppingcart', ViewShoppingCartItems) //fine
router.get('/products/:user_id/shoppingcart/:cart_item_id/details', ViewShoppingCartItemsDetails) //fine
router.delete('/products/:user_id/shoppingcart/:cart_item_id/delete', RemoveItemFromCart)
/* orders */
router.post('/products/:product_id/order/:user_id/', urlencodedParser, MakeOrder) //fine
router.get('/products/:user_id/orders', ViewMyOrders) //fine
router.get('/products/:user_id/pendingorders', MypendingOrders) //fine
router.get('/products/:user_id/completeorders', MyCompletedOrders) //fine

module.exports = router;
