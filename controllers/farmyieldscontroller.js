const FarmerConnection = require('../models/sqliteconnection')
const Yields = require('../models/Farmer/farmeryields')
const conn = new FarmerConnection('./farmer')
const farmer = new Yields(conn)
const { body,validationResult } = require('express-validator')

exports.AddYields = function(req, res){
    var error = validationResult(req)
    var farmer_id = req.body.farmer_id
    var yield_name = req.body.yield_name
    var sample_area = req.body.sample_area
    var number_of_yields_daily = req.body.number_of_yields_daily
    var yield_weight = req.body.yield_weight

    if (error.isEmpty) {
        farmer.createYieldTable()
        .then(() => farmer.addYields(farmer_id, yield_name, sample_area, number_of_yields_daily, yield_weight))
        .then(() => {
            res.json({message: "Added"})
        })
    }
}

exports.DisplayAllYields = function(req, res){
    farmer.displayAllYield()
    .then((data) => {
        res.json(data)
    })
}

exports.DisplayDetails = function(req, res){
    var yield_id = req.params.yield_id
    farmer.displayYield(yield_id)
    .then((data) => {
        res.json(data)
    })

}

exports.DeleteYield = function(req, res){
    var yield_id = req.params.yield_id
    farmer.deleteYield(yield_id)
    .then(() => {
        res.json({message: "Deleted"})
    })

}