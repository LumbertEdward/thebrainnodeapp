const FarmerConnection = require('../models/sqliteconnection')
const FarmInputsRecommendation = require('../models/Farmer/farminputsrecommendations')
const conn = new FarmerConnection('./agriculture')
const farminputs = new FarmInputsRecommendation(conn)
const { body,validationResult } = require('express-validator')
const path = require('path')
const url = "http://localhost:9000/images/products/"

exports.AddFarmInput = function(req, res) {
    var errors = validationResult(req)
    var farm_input_name = req.body.farm_input_name
    var farm_input_description = req.body.farm_input_description
    var farm_input_type = req.body.farm_input_type
    var associated_product = req.body.associated_product
    var farm_input_img = url + req.file.filename

    if (errors.isEmpty) {
        farminputs.createFarmInputsTable()
        .then(() => farminputs.addSmartFarmInputs(farm_input_name, farm_input_description, farm_input_type, associated_product, farm_input_img))
        .then(() => {
            res.json({message: "Farm Input Added"})
        })
        .catch((err) => {
            res.json({message: err})
        })
    }
    else{
        res.json({message: "Error"})
    }
    
}

exports.FarmInputRecommendationDetails = function(req, res){
    var farm_input_id = req.params.farm_input_id
    farminputs.smartFarmInputDetails(farm_input_id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.RecommendedEquipment = function(req, res){
    var associated_product = req.body.associated_product
    farminputs.searchSmartFarmInputsByEquipment(associated_product)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.RecommendedSeed = function(req, res){
    var associated_product = req.body.associated_product
    farminputs.searchSmartFarmInputsBySeed(associated_product)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.RecommendedFeed = function(req, res){
    var associated_product = req.body.associated_product
    farminputs.searchSmartFarmInputsByFeed(associated_product)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}

exports.RecommendedEnergy = function(req, res){
    var associated_product = req.body.associated_product
    farminputs.searchSmartFarmInputsByEnergy(associated_product)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
    
}

exports.AllRecommendations = function(req, res){
    farminputs.showSmartFarmInputs()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({message: err})
    })
}
