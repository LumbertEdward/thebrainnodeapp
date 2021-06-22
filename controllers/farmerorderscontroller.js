const FarmerConnection = require('../models/sqliteconnection')
const FarmerOrders = require('../models/Farmer/farmerordersdetails')
const conn = new FarmerConnection('./farmer')
const farmer = new FarmerOrders(conn)
const { body,validationResult } = require('express-validator')

exports.MyOrders = function(req, res){
    var farmer_id = req.params.farmer_id
    farmer.viewAllOrders(farmer_id)
    .then((data) => {
        res.json(data)
    })
}

exports.ViewOrderDetails = function(req, res){
    var farmer_id = req.params.farmer_id
    var order_id = req.params.order_id
    farmer.viewOrderDetails(farmer_id, order_id)
    .then((data) => {
        res.json(data)
    })
}

exports.RemoveOrder = function(req, res){
    var order_id = req.params.order_id
    farmer.RemoveOrder(farmer_id, order_id)
    .then(() => {
        res.json({message: 'Deleted'})
    })
}

exports.FarmerPendingOrders = function(req, res){
    var farmer_id = req.params.farmer_id
    farmer.viewPendingOrders(farmer_id)
    .then((data) => {
        res.json({message: "success", data})
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.FarmerCompletedOrders = function(req, res){
    var farmer_id = req.params.farmer_id
    farmer.viewCompletedOrders(farmer_id)
    .then((data) => {
        res.json(data)
    })
}

exports.MarkOrderAsComplete = function(req, res){
    var farmer_id = req.params.farmer_id
    var order_id = req.params.order_id
    var status = "complete"
    farmer.markOrderAsComplete(order_id, status, farmer_id)
    .then(() => {
        res.json({message: "marked"})
    })
}
