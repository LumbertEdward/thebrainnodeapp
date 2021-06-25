var express = require('express');
const { NewRecommendation, RecommendByRainfall, RecommendByTemperature, RecommendBySoilType, RecommendationDetails } = require('../controllers/croprecommendationcontroller');
const { FarmerRegister, FarmerLogin, ShowFarmerProfile, ShowFarmers, UpdateFarmerProfile } = require('../controllers/farmercontrollers');
const { ViewFarmerFaq, ViewAllFarmersFaq, ReplyFaq, ViewReplies, AddFaq } = require('../controllers/farmerfaqcontroller');
const { MyOrders, MarkOrderAsComplete, ViewOrderDetails, RemoveOrder, FarmerPendingOrders, FarmerCompletedOrders } = require('../controllers/farmerorderscontroller');
const { AddProduct, ViewProducts, ViewSelectedProductDetails, UpdateSelectedProduct, DeleteSelectedProduct } = require('../controllers/farmerproductscontroller');
const { AddSalesAndRevenue, ViewFarmerSalesAndRevenue, UpdateFarmerSalesAndRevenue, DeleteSalesAndRevenue } = require('../controllers/farmersalesandrevenuecontroller');
const { AddFarmInput, FarmInputRecommendationDetails, RecommendedEquipment, RecommendedFeed, RecommendedSeed, RecommendedEnergy, AllRecommendations } = require('../controllers/farminputsrecommendationController');
const { AddYields, DisplayDetails, DeleteYield, DisplayAllYields } = require('../controllers/farmyieldscontroller');
const { CreateTraining, TrainingDetails, UpdateTraining, ScheduledTrainings, UnenrollForTrainings, EnrollForTrainings, ViewTrainings } = require('../controllers/trainingscontroller');
var router = express.Router();
var urlencodedParser = express.urlencoded({ extended: false })
const path = require('path')

const multer = require('multer')

//profile pics
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/images/profile');
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  })
  
const upload = multer({storage: storage}).single('image')

//training images
const trainingstorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/trainings');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadtraining = multer({storage: trainingstorage}).single('image')

//product images
const productsstorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/products');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
})

const uploadproducts = multer({storage: productsstorage}).single('image')


/* GET Farmer. */
router.post('/register', upload, urlencodedParser, FarmerRegister) //register farmer
router.post('/login', urlencodedParser, FarmerLogin) //login farmer
router.get('/allfarmers', ShowFarmers) //view all farmers admin
router.get('/allfarmers/:id/profile', ShowFarmerProfile) //view farmer profile
router.get('/allfarmers/:id/profile/update', upload, urlencodedParser, UpdateFarmerProfile) //update farmer profile

/* GET FARMER PRODUCTS */ 
router.get('/:id/products', ViewProducts) //view farmer product
router.post('/products/addproduct', uploadproducts, urlencodedParser, AddProduct) //add a product
router.get('/:id/products/:product_id', ViewSelectedProductDetails) //view product details
router.post('/:id/products/:product_id/update', urlencodedParser, UpdateSelectedProduct) //update product details
router.get('/:id/products/:product_id/delete', DeleteSelectedProduct) //delete a product

/* GET FARMER-CUSTOMER ORDERS */
router.get('/:farmer_id/orders', MyOrders) //view farmer orders
router.get('/:farmer_id/orders/:order_id', ViewOrderDetails) //view an order details
router.get('/:farmer_id/orders/pending/all', FarmerPendingOrders) //view all pending orders of a farmer
router.get('/:farmer_id/orders/pending/:order_id', ViewOrderDetails) //view details of a pending order
router.get('/:farmer_id/orders/pending/:order_id/mark_complete', MarkOrderAsComplete) //mark pending orders as complete
router.get('/:farmer_id/orders/completed/all', FarmerCompletedOrders) //view all complete orders of a farmer
router.get('/:farmer_id/orders/completed/:order_id', ViewOrderDetails) //view details of a complete order
router.get('/:farmer_id/orders/completed/:order_id/delete', RemoveOrder) //remove a complete order

/* GET FARMER FAQS */
router.get('/faqs',ViewAllFarmersFaq ) //view all the faqs
router.get('/faqs/:faq_id/', ViewFarmerFaq) //view details of a faq
router.post('/faqs/add', urlencodedParser, AddFaq) //add a faq
router.post('/faqs/:faq_id/reply/add', urlencodedParser, ReplyFaq) //reply a faq
router.get('/faqs/:faq_id/reply', ViewReplies) //view all replies of a faq

/* GET AGRICULTURAL TRAINING */
router.get('/trainings', ViewTrainings) //view all trainings
router.post('/trainings/add', uploadtraining, urlencodedParser, CreateTraining) //create a training program admin
router.get('/trainings/:training_id/details', TrainingDetails) //view details of a training program
router.post('/trainings/:training_id/update', urlencodedParser, UpdateTraining) //update details of a training program by admin only
router.post('/trainings/:training_id/attend', urlencodedParser, EnrollForTrainings) //enroll for a training
router.get('/trainings/:farmer_id/', ScheduledTrainings) //view all enrolled trainings
router.get('/trainings/:farmer_id/:training_id/delete', UnenrollForTrainings) //unenroll from a training

/* GET RECOMMENDED CROPS */
router.post('/recommendedcrops/add', uploadproducts, urlencodedParser, NewRecommendation) //add recommended crops by admin
router.post('/recommendedcrops/search/byrainfall', urlencodedParser, RecommendByRainfall) //recommend best crops by rainfall
router.post('/recommendedcrops/search/bytemperature', urlencodedParser, RecommendByTemperature) //recommend best crops by temperature
router.post('/recommendedcrops/search/bysoiltype', urlencodedParser, RecommendBySoilType) //recommend best crops by soil type
router.get('/recommendedcrops/search/:crop_id/details', RecommendationDetails) //view details of a recommended crop

/* GET RECOMMENDED FARM INPUTS */
router.post('/recommendedfarminput/add', uploadproducts, urlencodedParser, AddFarmInput) //add recommended farm input by admin
router.get('/recommendedfarminput/Recommendations/all', AllRecommendations) //view all farm input recommendations 
router.post('/recommendedfarminput/search/byequipment', urlencodedParser, RecommendedEquipment) //search farm inputs by equipment
router.post('/recommendedfarminput/search/byfeed', urlencodedParser, RecommendedFeed) //search recommended farm input by feed
router.post('/recommendedfarminput/search/byseed', urlencodedParser, RecommendedSeed) //search recommended farm input by seed
router.post('/recommendedfarminput/search/byenergy', urlencodedParser, RecommendedEnergy) //search recommended farm input by energy
router.get('/recommendedfarminput/search/:farm_input_id/details', FarmInputRecommendationDetails) //view recommended farm input details

/* GET CROP YIELDS DATA */
router.get('/:farmer_id/yields', DisplayAllYields) //view farmer yields
router.post('/:farmer_id/yields/add', urlencodedParser, AddYields) //add farmer yields
router.get('/:farmer_id/yields/:yield_id/details', DisplayDetails) //view details of a farmer yield
router.get('/:farmer_id/yields/:yield_id/delete', DeleteYield) //delete a farmer yield

/* GET FARMER SALES AND REVENUE STATISTICS */
router.post('/:farmer_id/sales/add', urlencodedParser, AddSalesAndRevenue) //add sales made by farmer
router.get('/:farmer_id/sales/view', ViewFarmerSalesAndRevenue) //view the sales made by farmer
router.post('/:farmer_id/sales/:sales_id/update', urlencodedParser, UpdateFarmerSalesAndRevenue) //update sales made by farmer
router.get('/:farmer_id/sales/:sales_id/delete', DeleteSalesAndRevenue) //delete the sales made by farmer

module.exports = router;