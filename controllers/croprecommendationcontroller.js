const FarmerConnection = require('../models/sqliteconnection')
const CropRecommendation = require('../models/Farmer/croprecommendationmodel')
const conn = new FarmerConnection('./agriculture')
const farmer = new CropRecommendation(conn)
const { body,validationResult } = require('express-validator')
const path = require('path')
const url = "http://localhost:9000/images/products/"

exports.NewRecommendation = function(req, res){
    var errors = validationResult(req)
    var crop_name = req.body.crop_name
    var crop_description = req.body.crop_description
    var soil_type = req.body.soil_type
    var lowest_temperature = req.body.lowest_temperature
    var highest_temperature = req.body.highest_temperature
    var lowest_rainfall = req.body.lowest_rainfall
    var highest_rainfall = req.body.highest_rainfall
    var crop_img = url + req.file.filename
    if (errors.isEmpty) {
        farmer.createRecommendationsTable()
        .then(() => farmer.addSmartCrops(crop_name, crop_description, soil_type, lowest_temperature, highest_temperature, lowest_rainfall, highest_rainfall, crop_img))
        .then(() => {
            res.json({message: "Added"})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else{
        res.json({message: "Error"})
    }
}

exports.RecommendationDetails = function(req, res){
    var crop_id = req.params.crop_id
    farmer.smartCropDetails(crop_id)
    .then((data) => {
        res.json(data)
    })
}

exports.RecommendByTemperature = function(req, res){
    var lowest_temperature = req.body.lowest_temperature
    var highest_temperature = req.body.highest_temperature
    farmer.showSmartCrops()
    .then((data) => data.data.filter((item) => item.highest_temperature < parseInt(highest_temperature)))
    .then((low) => low.filter((item) => item.lowest_temperature > parseInt(lowest_temperature)))
    .then((resAll) => {
        res.json(resAll)
    })
}

exports.RecommendByRainfall = function(req, res){
    var lowest_rainfall = req.body.lowest_rainfall
    var highest_rainfall = req.body.highest_rainfall
    farmer.showSmartCrops()
    .then((data) => data.data.filter((item) => item.highest_rainfall < parseInt(highest_rainfall)))
    .then((low) => low.filter((item) => item.lowest_rainfall > parseInt(lowest_rainfall)))
    .then((resAll) => {
        res.json(resAll)
    })
}

exports.RecommendBySoilType = function(req, res){
    var soil_type = req.body.soil_type
    farmer.searchSmartCropsBySoilType(soil_type)
    .then((data) => {
        res.json(data)
    })
}

