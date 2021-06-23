const FarmerConnection = require('../models/sqliteconnection')
const AgriculturalProduct = require('../models/Farmer/productdetails')
const conn = new FarmerConnection('./agriculture')
const farmer = new AgriculturalProduct(conn)
const { body,validationResult } = require('express-validator')
const path = require('path')
const url = "http://localhost:9000/images/products/"

exports.ViewProducts = function(req, res, next){
    var farmer_id = req.params.id
    farmer.viewAllFarmerProducts(farmer_id)
    .then((data) => {
        res.json(data)
    })
}

exports.AddProduct = function(req, res, next){
    var errors = validationResult(req)
    var farmer_id = req.body.farmer_id
    var product_name = req.body.product_name
    var product_description = req.body.product_description
    var product_price = req.body.product_price
    var product_image = url + Date.now() + path.extname(req.file.filename)
    if (errors.isEmpty) {
        if (!req.file) {
            res.json({message: "Image Missing"})
        }
        else{
            farmer.createProductsTable()
            .then(() => farmer.addProduct(farmer_id, product_name, product_description, product_price, product_image))
            .then(() => farmer.viewAllFarmerProducts(farmer_id))
            .then(() => {
                res.json({message: "Added Successfully"})
            })
        }
    }
    else{
        res.json({error: errors.array()})
        return
    }
}

exports.ViewSelectedProductDetails = function(req, res, next){
    var product_id = req.params.product_id
    farmer.viewProductDetails(product_id)
    .then((data) => {
        res.json(data)
    })
    
}

exports.UpdateSelectedProduct = function(req, res){
    var product_id = req.params.product_id
    var product_name = req.body.product_name
    var product_description = req.body.product_description
    var product_price = req.body.product_price
    var product_image = req.body.product_image
    farmer.updateProduct(product_name, product_description, product_price, product_image, product_id)
    .then(() => farmer.viewProductDetails(product_id))
    .then((data) => {
        res.json(data)
    })

}

exports.DeleteSelectedProduct = function(req, res){
    var product_id = req.params.product_id
    farmer.deleteProduct(product_id)
    .then(() => {
        res.send("Deleted")
    })
    
} 
