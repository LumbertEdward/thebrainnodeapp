const FarmerConnection = require('../models/sqliteconnection')
const FarmerFaq = require('../models/Farmer/farmerfaqstable')
const FaqReplies = require('../models/Farmer/faqsreplies')
const conn = new FarmerConnection('./farmer')
const farmer = new FarmerFaq(conn)
const replies = new FaqReplies(conn)
const { body,validationResult } = require('express-validator')

exports.AddFaq = function(req, res){
    var farmer_id = req.body.farmer_id
    var question = req.body.question
    var reply = req.body.reply
    var likes = req.body.likes
    var now = new Date()
    var time = now.toLocaleDateString();
    

    farmer.createFAQTable()
    .then(() => farmer.addFaq(farmer_id, time, question, reply, 0))
    .then(() => {
        res.json({message: "Added"})
    })
}

exports.ViewFarmerFaq = function(req, res){
    var faq_id = req.params.faq_id
    farmer.viewFaq(faq_id)
    .then((data) => {
        res.json(data)
    })
}

exports.ViewAllFarmersFaq = function(req, res){
    farmer.viewAllFaqs()
    .then((data) => {
        res.json(data)
    })
}

//replies

exports.ViewReplies = function(req, res){
    var faq_id = req.params.faq_id
    replies.viewReply(faq_id)
    .then((data) => {
        res.json(data)
    })

}

exports.ReplyFaq = function(req, res){
    var faq_id = req.body.faq_id
    var farmer_id = req.body.farmer_id
    var reply = req.body.reply
    var now = new Date()
    var time = now.toLocaleDateString();
    replies.createFAQRepliesTable()
    .then(() => replies.addReplyFaq(faq_id, farmer_id, time, reply))
    .then(() => {
        res.json({message: "added"})
    })

}