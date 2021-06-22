const FarmerConnection = require('../models/sqliteconnection')
const AgriculturalTraining = require('../models/Farmer/agriculturaltrainingmodel')
const EnrolledTrainings = require('../models/Farmer/enrolledtrainings')
const conn = new FarmerConnection('./farmer')
const farmer = new AgriculturalTraining(conn)
const enrolled = new EnrolledTrainings(conn)
const { body,validationResult } = require('express-validator')

exports.CreateTraining = function(req, res){
    var training_subject = req.body.training_subject
    var training_date = req.body.training_date
    var training_description = req.body.training_description
    var training_location = req.body.training_location
    var training_duration = req.body.training_duration
    var application_deadline = req.body.application_deadline
    var number_of_attendees = req.body.number_of_attendees
    farmer.createAgriculturalTrainingTable()
    .then(() => farmer.addTraining(training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees))
    .then(() => {
        res.json({message: "Training Added"})
    })
    .catch((err) => {
        res.json({error: err})
    })
}

exports.ViewTrainings = function(req, res){
    farmer.viewTrainings()
    .then((data) => {
        res.json(data)
    })
}

exports.TrainingDetails = function(req, res){
    var farmer_id = req.params.training_id
    farmer.viewTrainingDetails(farmer_id)
    .then((data) => {
        res.json(data)
    })
}

exports.UpdateTraining = function(req, res){
    var training_id = req.params.training_id
    var training_subject = req.body.training_subject
    var training_date = req.body.training_date
    var training_description = req.body.training_description
    var training_location = req.body.training_location
    var training_duration = req.body.training_duration
    var application_deadline = req.body.application_deadline
    var number_of_attendees = req.body.number_of_attendees

    farmer.updateTraining(training_id, training_subject, training_date, training_description, training_location, training_duration, application_deadline, number_of_attendees)
    .then(() => {
        res.json({message: "Updated"})
    })

}

exports.EnrollForTrainings = function(req, res){
    var training_id = req.params.training_id
    var farmer_id = req.body.farmer_id
    enrolled.createEnrolledTrainingsTable()
    .then(() => enrolled.enrollForTraining(training_id, farmer_id))
    .then(() => {
        res.json({message: `Enrolled for ${training_id}`})
    })
}

exports.ScheduledTrainings = function(req, res){
    var farmer_id = req.params.farmer_id
    enrolled.viewEnrolledTrainings(farmer_id)
    .then((data) => {
        res.json(data)
    })
}

exports.UnenrollForTrainings = function(req, res){
    var farmer_id = req.params.farmer_id
    var training_id = req.params.training_id
    enrolled.unenrollForTraining(training_id, farmer_id)
    .then(() => {
        res.json({message: "Enenrolled"})
    })
}