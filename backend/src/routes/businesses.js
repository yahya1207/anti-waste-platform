const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// Route to create a new business
router.post('/', businessController.createBusiness);

// Route to get all businesses
router.get('/', businessController.getAllBusinesses);

// Route to get a specific business by ID
router.get('/:id', businessController.getBusinessById);

// Route to update a business by ID
router.put('/:id', businessController.updateBusiness);

// Route to delete a business by ID
router.delete('/:id', businessController.deleteBusiness);

module.exports = router;