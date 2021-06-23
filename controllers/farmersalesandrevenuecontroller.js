const FarmerConnection = require('../models/sqliteconnection')
const SalesAndRevenue = require('../models/Farmer/farmersalesandrevenue')
const conn = new FarmerConnection('./agriculture')
const sales = new SalesAndRevenue(conn)
const { body,validationResult } = require('express-validator')

exports.AddSalesAndRevenue = function(req, res){
    var errors = validationResult(req)
    var farmer_id = req.params.farmer_id
    var item_sold = req.body.item_sold
    var total_items_sold = req.body.total_items_sold
    var items_cost = req.body.items_cost
    var amount_received = req.body.amount_received
    var date_sold = req.body.date_sold

    if(errors.isEmpty()){
        sales.createSalesTable()
        .then(() => sales.addSalesAndRevenue(farmer_id, item_sold, total_items_sold, items_cost, amount_received, date_sold))
        .then(() => {
            res.json({message: "Sales Added"})
        })
        .catch((err) => {
            res.json({message: err})
        })
    }
}

exports.ViewFarmerSalesAndRevenue = function(req, res){
    var farmer_id = req.params.farmer_id
    sales.viewFarmerSalesAndRevenue(farmer_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
}

exports.UpdateFarmerSalesAndRevenue = function(req, res){
    var sales_id = req.params.sales_id
    var item_sold = req.body.item_sold
    var total_items_sold = req.body.total_items_sold
    var items_cost = req.body.items_cost
    var amount_received = req.body.amount_received
    var date_sold = req.body.date_sold

    sales.updateFarmerSalesAndRevenue(sales_id, item_sold, total_items_sold, items_cost, amount_received, date_sold)
    .then(() => {
        res.json({message: "Updated"})
    })
    .catch((err) => {
        res.json(err)
    })
}

exports.DeleteSalesAndRevenue = function(req, res){
    var sales_id = req.params.sales_id
    sales.deleteFarmerSalesAndRevenue(sales_id)
    .then(() => {
        res.json({message: "Deleted"})
    })
    .catch((err) => {
        res.json(err)
    })
}

