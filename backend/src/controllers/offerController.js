// backend/src/controllers/offerController.js

const { Offer } = require('../models');

// Create a new offer
exports.createOffer = async (req, res) => {
    try {
        const { title, description, original_price, discounted_price, quantity_available, pickup_start, pickup_end } = req.body;
        const newOffer = new Offer({
            title,
            description,
            original_price,
            discounted_price,
            quantity_available,
            pickup_start,
            pickup_end,
            status: 'active'
        });
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating offer', error });
    }
};

// Get all offers
exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ status: 'active' });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving offers', error });
    }
};

// Get offer by ID
exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving offer', error });
    }
};

// Update an offer
exports.updateOffer = async (req, res) => {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating offer', error });
    }
};

// Delete an offer
exports.deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting offer', error });
    }
};