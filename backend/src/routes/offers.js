const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Route to create a new offer
router.post('/', offerController.createOffer);

// Route to retrieve all offers
router.get('/', offerController.getAllOffers);

// Route to retrieve a specific offer by ID
router.get('/:id', offerController.getOfferById);

// Route to update an existing offer
router.put('/:id', offerController.updateOffer);

// Route to delete an offer
router.delete('/:id', offerController.deleteOffer);

module.exports = router;