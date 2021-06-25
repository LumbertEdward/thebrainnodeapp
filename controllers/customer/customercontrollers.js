const CustomerConnection = require('../../models/sqliteconnection')
const CustomerRegister = require('../../models/customer/customerdetails')
const CustomerOrders = require('../../models/customer/customerorders')
const FarmerProducts = require('../../models/Farmer/productdetails')
const ShoppingCart = require('../../models/customer/shoppingcart')
const conn = new CustomerConnection('./agriculture')
const customer = new CustomerRegister(conn)
const orders = new CustomerOrders(conn)
const farmerProds = new FarmerProducts(conn)
const shopping = new ShoppingCart(conn)
const { body,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const path = require('path')
const url = "http://localhost:9000/images/profile/"

exports.Login = function(req, res){
    var errors = validationResult(req)
    if (errors.isEmpty) {
        customer.getFarmerByEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            if(data){
                res.json({message: "Succefully Logged In", data})
            }
            else{
                console.log("Not")
                res.json({message: "Wrong details"})
            }
            
        })
        .catch((err) => {
            res.send(err)
        })
    }
    else{
        res.json({error: errors.isEmpty})
        return;
    }

}

exports.Register = function(req, res){
    var errors = validationResult(req)
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var gender = req.body.gender
    var phone_number = req.body.phone_number
    var password = req.body.password
    var profile_img = url + Date.now() + path.extname(req.file.filename)
    if (errors.isEmpty) {
        if (!req.file) {
            res.json({message: "Image Missing"})
        }
        else{
            customer.CreateCustomerTable()
            .then(() => customer.addCustomer(first_name, last_name, email, gender, phone_number, password, profile_img))
            .then(() => customer.getCustomerByEmail(email))
            .then((data) => {
                res.json({message: "Successfully Registered", data})
            })
            .catch((err) => {
                res.json({message: "Not Registered", error: err})
                })
            }
        
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

exports.UpdateCustomerProfile = function(req, res){
    var errors = validationResult(req)
    var firstname = req.body.first_name
    var lastname = req.body.last_name
    var phonenumber = req.body.phone_number
    var profile_img = url + Date.now() + path.extname(req.file.filename)
    var user_id = req.params.user_id

    if (errors.isEmpty) {
        if (!req.file) {
            res.json({message: "No File"})
        }
        else{
            customer.updateCustomer(firstname, lastname, phonenumber, user_id, profile_img)
            .then(() => {
                res.json({message: "Updated"})
            })
            .catch((err) => {
                res.json({message: err})
            })
        }
        
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

//orders

exports.MakeOrder = function(req, res){
    var userId = req.params.user_id
    var farmer_id = req.body.farmer_id
    var order_price = req.body.order_price
    var now = new Date()
    var time = now.toLocaleDateString();
    var order_date = time
    var devDate = new Date()
    var devDate2 = new Date()
    devDate2.setDate(devDate.getDate() + 1)
    var delivery_date = devDate2.toLocaleDateString()
    var order_product = req.body.order_product
    var quantity = req.body.quantity
    var status = "pending"
    orders.createCustomerOrdersTable()
    .then(() => orders.makeOrder(userId, farmer_id, order_price, order_date , delivery_date, order_product, quantity, status))
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

//shopping cart

exports.AddToCart = function(req, res){
    var product_id = req.params.product_id
    var userId = req.params.userId
    var farmer_id = req.params.farmer_id
    shopping.createShoppingCartTable()
    .then(() => shopping.addToCart(userId, product_id, farmer_id))
    .then(() => {
        res.json({message: "Added to Cart"})
    })    

}

exports.ViewShoppingCartItems = function(req, res){
    var userId = req.params.user_id
    shopping.viewCartProducts(userId)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
}

exports.ViewShoppingCartItemsDetails = function(req, res){
    var cart_item_id = req.params.cart_item_id
    shopping.viewCartProductDetails(cart_item_id)
    .then(() => {
        res.json(data.row)
    })
    .catch((err) => {
        res.json(err)
    })
}


exports.RemoveItemFromCart = function(req, res){
    var cart_item_id = req.params.cart_item_id
    shopping.deleteProductFromCart(cart_item_id)
    .then(() => {
        res.json({message: `${cart_item_id} Removed`})
    })
    .catch((err) => {
        res.json({message: `Error, ${cart_item_id} Not Removed`})
    })
}