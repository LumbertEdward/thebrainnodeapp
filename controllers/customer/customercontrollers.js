const CustomerConnection = require('../../models/sqliteconnection')
const CustomerRegister = require('../../models/customer/customerdetails')
const CustomerOrders = require('../../models/customer/customerorders')
const CustomerOrderProducts = require('../../models/customer/customerordersproducts')
const FarmerProducts = require('../../models/Farmer/productdetails')
const CustomerNotifications = require('../../models/customer/customernotifications')
const CustomerFavourites = require('../../models/customer/customerfavourites')
const CustCart = require('../../models/customer/customercart')
const conn = new CustomerConnection('./agriculture')
const MyCart = new CustCart(conn)
const customer = new CustomerRegister(conn)
const orders = new CustomerOrders(conn)
const farmerProds = new FarmerProducts(conn)
const OrderProduct = new CustomerOrderProducts(conn)
const Notifications = new CustomerNotifications(conn)
const Favourites = new CustomerFavourites(conn)
const { body,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const path = require('path')

const url = "images/profile/"

exports.Login = function(req, res){
    var errors = validationResult(req)
    if (errors.isEmpty) {
        customer.getCustomerByEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            res.json(data)            
        })
        .catch((err) => {
            res.json({message: err})
        })
    }
    else{
        res.json({error: errors.isEmpty})
        return;
    }

}

exports.GoogleLogin = function(req, res){
    customer.getCustomerByEmail(req.body.email)
    .then((data) => {
        res.json(data)
    })
}

exports.Register = function(req, res){
    var errors = validationResult(req)
    var userId = req.body.userId
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var gender = req.body.gender
    var phone_number = req.body.phone_number
    var location = req.body.location
    var password = req.body.password
    var profile_img = "Unknown"
    if (errors.isEmpty) {
        customer.CreateCustomerTable()
        .then(() => customer.addCustomer(userId, first_name, last_name, email, gender, phone_number, password, profile_img, location))
        .then(() => customer.getCustomerByEmail(email))
        .then((data) => {
            res.json(data)
            })
        }
    else{
        res.json({error: errors.array()})
        return
    }

}

exports.GoogleUserRegister = function(req, res) {
    var errors = validationResult(req)
    var userId = req.body.userId
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var photo = req.body.photo
    if (errors.isEmpty) {
        customer.CreateCustomerTable()
        .then(() => customer.addGoogleCustomer(userId, first_name, last_name, email, photo))
        .then(() => customer.getCustomerByEmail(email))
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json({message: "Not Registered", error: err})
            })
        }
    else{
        res.json({error: errors.array()})
        return
    }
    
}

exports.showCustomerProfile = function(req, res) {
    customer.getCustomerById(req.params.user_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
}

exports.showAllTheCustomers = function(req, res) {
    customer.getAllCustomers()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
}

exports.UpdateCustomerProfile = function(req, res){
    var errors = validationResult(req)
    var firstname = req.body.first_name
    var lastname = req.body.last_name
    var phonenumber = req.body.phone_number
    var profile_img = " "
    var location = req.body.location
    var user_id = req.params.user_id

    if (errors.isEmpty) {
        customer.updateCustomer(firstname, lastname, phonenumber, user_id, profile_img, location)
        .then(() => {
            res.json({message: "Updated"})
        })
        .catch((err) => {
            res.json({message: err})
        }) 
    }
    else{
        res.json({message: "Error"})
    }
    
}

//products

exports.Products = function(req, res){
    farmerProds.viewAllOrders()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: "No Data", err})
    })

}

exports.ProductDetails = function(req, res){
    farmerProds.viewCustomerProductDetails(req.params.product_id)
    .then((data) => {
        res.json(data)
    })

}

exports.ProductType = function(req, res) {
    var type = req.query.type
    farmerProds.viewOrdersByType(type)
    .then((data) => {
        res.json(data)
    })
}

//orders

exports.MakeOrder = function(req, res){
    var userId = req.params.user_id
    var order_price = req.body.order_price
    var order_id = req.body.order_id
    var delivery_date = req.body.delivery_date
    var delivery_time = req.body.delivery_time
    var now = new Date()
    var time = now.toLocaleDateString();
    var order_date = time
    var devDate = new Date()
    var devDate2 = new Date()
    devDate2.setDate(devDate.getDate() + 1)
    var delivery_date = devDate2.toLocaleDateString()
    var status = "pending"
    orders.createCustomerOrdersTable()
    .then(() => orders.makeOrder(order_id, userId, order_price, order_date , delivery_date, delivery_time, status))
    .then(() => {
        res.json({message: "Item Ordered"})
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.ViewMyOrders = function(req, res){
    var userId = req.params.user_id
    orders.viewMyOrders(userId)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })

}

exports.ViewOrderDetails = function(req, res){
    var userId = req.params.user_id
    var order_id = req.params.order_id
    orders.viewOrderDetails(userId, order_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.MypendingOrders = function(req, res){
    var status = "pending"
    var userId = req.params.user_id
    orders.viewPendingOrders(status, userId)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })

}

exports.MyCompletedOrders = function(req, res){
    var status = "complete"
    var userId = req.params.user_id
    orders.viewCompletedOrders(status, userId)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.AddOrderProducts = function(req, res) {
    var farmer_id = req.body.farmer_id
    var orderId = req.body.order_id
    var status = "Pending"
    var product_id = req.body.product_id
    OrderProduct.createCustomerOrderProducts()
    .then(() => OrderProduct.addOrderProduct(product_id, farmer_id, orderId, status))
    .then(() => OrderProduct.viewOrderProducts(orderId))
    .then((data) => {
        res.json(data)
    })
}

exports.OrderProducts = function(req, res) {
    var orderId = req.params.order_id
    OrderProduct.viewOrderProducts(orderId)
    .then((data) => {
        res.json(data)
    })
}

//shopping cart

exports.AddToCart = function(req, res){
    var product_id = req.params.product_id
    var userId = req.params.userId
    var farmer_id = req.params.farmer_id
    var total_items = req.params.total_items
    MyCart.createShoppingCartTable()
    .then(() => MyCart.addToCart(userId, product_id, farmer_id, total_items))
    .then(() => MyCart.viewCartProductDetails(product_id))
    .then((data) => {
        res.json(data)
    })    
}

/**exports.AddToCart = function(req, res){
    var product_id = req.params.product_id
    var userId = req.params.userId
    var farmer_id = req.params.farmer_id
    var product_name = req.body.product_name
    var product_description = req.body.product_description
    var product_price = req.body.product_price
    var product_type = req.body.product_type
    var product_calcs = req.body.product_calcs
    var product_delivery_time = req.body.product_delivery_time
    var product_image = req.body.product_image
    shopping.createShoppingCartTable()
    .then(() => shopping.addToCart(userId, product_id, farmer_id, product_name, product_description, product_price, product_image, product_type, product_calcs, product_delivery_time))
    .then(() => {
        res.json({message: "Added"})
    })    
}**/

exports.ViewShoppingCartItems = function(req, res){
    var userId = req.params.user_id
    MyCart.viewCartProducts(userId)
    .then((data) => {
        res.json(data)
    })
}

exports.ViewShoppingCartItemsDetails = function(req, res){
    var product_id = req.params.product_id
    MyCart.viewCartProductDetails(product_id)
    .then((data) => {
        res.json(data)
    })
}


exports.RemoveItemFromCart = function(req, res){
    var cart_item_id = req.params.cart_item_id
    MyCart.deleteProductFromCart(cart_item_id)
    .then(() => {
        res.json({message: `${cart_item_id} Removed`})
    })
    .catch((err) => {
        res.json({message: `Error, ${cart_item_id} Not Removed`})
    })
}

exports.DeleteCart = function(req, res){
    MyCart.dropTable()
    .then(() => {
        res.json({message: `Removed`})
    })
    .catch((err) => {
        res.json({message: `Not Removed`})
    })
}

//notifications

exports.AddNotification = function(req, res){
    var user_id = req.body.user_id
    var notification = req.body.notification
    var notification_date = req.body.notification_date
    Notifications.CreateNotification()
    .then(() => Notifications.addNotification(user_id, notification, notification_date))
    .then(() => Notifications.viewUserNotifications(user_id))
    .then((data) => {
        res.json(data)
    })
}

exports.viewNotification = function(req, res) {
    var user_id = req.params.user_id
    Notifications.viewUserNotifications(user_id)
    .then((data) => {
        res.json(data)
    })
    
}

exports.viewAllNotification = function(req, res) {
    Notifications.viewAllNotifications()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
    
}

//favourites
exports.AddFavourites = function(req, res) {
    var user_id = req.body.user_id
    var product_id = req.body.product_id

    Favourites.createFavouritesTable()
    .then(() => Favourites.addFavourites(user_id, product_id))
    .then(() => Favourites.viewFavouriteItem(product_id))
    .then((data) => {
        res.json(data)
    })
}

exports.ViewFavourites = function(req, res) {
    var user_id = req.query.user_id
    Favourites.viewUserFavourites(user_id)
    .then((data) => {
        res.json(data)
    })
}

exports.DeleteFavourites = function(req, res) {
    var user_id = req.query.user_id
    var product_id = req.query.product_id
    Favourites.deleteFavourite(user_id, product_id)
    .then(() => Favourites.viewUserFavourites(user_id))
    .then((data) => {
        res.json(data)
    })
}

exports.CheckFavourites = function(req, res) {
    var user_id = req.query.user_id
    var product_id = req.query.product_id
    Favourites.checkProduct(user_id, product_id)
    .then((data) => {
        res.json(data)
    })
}