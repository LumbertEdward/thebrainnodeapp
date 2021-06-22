var express = require('express');
const { NewRecommendation, RecommendByRainfall, RecommendByTemperature, RecommendBySoilType, RecommendationDetails } = require('../controllers/croprecommendationcontroller');
const { FarmerRegister, FarmerLogin, ShowFarmerProfile, ShowFarmers } = require('../controllers/farmercontrollers');
const { ViewFarmerFaq, ViewAllFarmersFaq, ReplyFaq, ViewReplies, AddFaq } = require('../controllers/farmerfaqcontroller');
const { MyOrders, MarkOrderAsComplete, ViewOrderDetails, RemoveOrder, FarmerPendingOrders, FarmerCompletedOrders } = require('../controllers/farmerorderscontroller');
const { AddProduct, ViewProducts, ViewSelectedProductDetails, UpdateSelectedProduct, DeleteSelectedProduct } = require('../controllers/farmerproductscontroller');
const { AddYields, DisplayDetails, DeleteYield, DisplayAllYields } = require('../controllers/farmyieldscontroller');
const { CreateTraining, TrainingDetails, UpdateTraining, ScheduledTrainings, UnenrollForTrainings, EnrollForTrainings, ViewTrainings } = require('../controllers/trainingscontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false })

/* GET Farmer. */
router.post('/register', urlencodedParser, FarmerRegister) //fine
router.post('/login', urlencodedParser, FarmerLogin) //fine
router.get('/allfarmers', ShowFarmers) //fine
router.get('/allfarmers/:id/profile', ShowFarmerProfile) //fine

/* GET FARMER PRODUCTS */ 
router.get('/:id/products', ViewProducts) //fine
router.post('/products/addproduct', urlencodedParser, AddProduct) //fine
router.get('/:id/products/:product_id', ViewSelectedProductDetails) //fine
router.post('/:id/products/:product_id/update', urlencodedParser, UpdateSelectedProduct) //fine
router.get('/:id/products/:product_id/delete', DeleteSelectedProduct) //fine

/* GET FARMER-SUPPLIERS ORDERS */
router.get('/:farmer_id/orders', MyOrders) //fine
router.get('/:farmer_id/orders/:order_id', ViewOrderDetails) //fine
router.get('/:farmer_id/orders/pending/all', FarmerPendingOrders) //fine
router.get('/:farmer_id/orders/pending/:order_id', ViewOrderDetails) //fine
router.get('/:farmer_id/orders/pending/:order_id/mark_complete', MarkOrderAsComplete) //fine
router.get('/:farmer_id/orders/completed/all', FarmerCompletedOrders) //fine
router.get('/:farmer_id/orders/completed/:order_id', ViewOrderDetails) //fine
router.get('/:farmer_id/orders/completed/:order_id/delete', RemoveOrder) //fine

/* GET FARMER FAQS */
router.get('/faqs',ViewAllFarmersFaq ) //fine
router.get('/faqs/:faq_id/', ViewFarmerFaq) //fine
router.post('/faqs/add', urlencodedParser, AddFaq) //fine
router.post('/faqs/:faq_id/reply/add', urlencodedParser, ReplyFaq) //fine
router.get('/faqs/:faq_id/reply', ViewReplies) //fine

/* GET AGRICULTURAL TRAINING */
router.get('/trainings', ViewTrainings) //fine
router.post('/trainings/add', CreateTraining) //fine
router.get('/trainings/:training_id/details', TrainingDetails) //fine
router.post('/trainings/:training_id/update', UpdateTraining) //fine
router.post('/trainings/:training_id/attend', EnrollForTrainings) //fine
router.get('/trainings/:farmer_id/', ScheduledTrainings) //fine
router.get('/trainings/:farmer_id/:training_id/delete', UnenrollForTrainings) //fine

/* GET RECOMMENDED CROPS */
router.post('/recommendedcrops/add', NewRecommendation) //fine
router.post('/recommendedcrops/search/byrainfall', RecommendByRainfall) //fine
router.post('/recommendedcrops/search/bytemperature', RecommendByTemperature) //fine
router.post('/recommendedcrops/search/bysoiltype', RecommendBySoilType) //fine
router.get('/recommendedcrops/search/:crop_id/details', RecommendationDetails) //fine

/* GET CROP YIELDS DATA */
router.get('/:farmer_id/yields', DisplayAllYields) //fine
router.post('/:farmer_id/yields/add', AddYields) //fine
router.get('/:farmer_id/yields/:yield_id/details', DisplayDetails) //fine
router.get('/:farmer_id/yields/:yield_id/delete', DeleteYield) //fine

module.exports = router;
