const FarmerConnection = require('../models/sqliteconnection')
const FarmerRegister = require('../models/Farmer/farmerdetails')
const conn = new FarmerConnection('./agriculture')
const farmer = new FarmerRegister(conn)
const { body,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const path = require('path')
const url = "images/profile/"

exports.FarmerRegister = function(req, res, next){
    var errors = validationResult(req)
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var email = req.body.email
    var gender = req.body.gender
    var phone_number = req.body.phone_number
    var bio = req.body.bio
    var id_number = req.body.id_number
    var password = req.body.password
    var location = req.body.location
    var profile_pic = url + req.file.filename
    if (errors.isEmpty) {
        farmer.createTable()
        .then(() => farmer.insertFarmer(first_name, last_name, email, gender, phone_number, bio, profile_pic, id_number, password, location))
        .then(() => farmer.getFarmerByEmail(email))
        .then((data) => {
            res.json({message: "Successfully Registered", data})
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

exports.FarmerLogin = function(req, res){
    var errors = validationResult(req)
    if (errors.isEmpty) {
        farmer.getFarmerByEmailAndPassword(req.body.email, req.body.password)
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
            res.end(err)
        })
    }
    else{
        res.json({error: errors.isEmpty})
        return;
    }
    
}

exports.ShowFarmerProfile = function(req, res, next){
    farmer.getFarmerById(req.params.id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({err: err})
    })
}

exports.UpdateFarmerProfile = function(req, res){
    var errors = validationResult(req)
    var firstname = req.body.first_name
    var lastname = req.body.last_name
    var phonenumbr = req.body.phone_number
    var profilepic = url + req.file.filename
    var bio = req.params.bio
    var idNumber = req.body.id_number
    var farmer_id = req.params.id

    if (errors.isEmpty) {
        farmer.updateFarmer(firstname, lastname, phonenumbr, bio, profilepic, idNumber, farmer_id)
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

exports.ShowFarmers = function(req, res, next){
    farmer.getAllFarmers()
    .then((data) => {
        res.json(data)
    })
}
