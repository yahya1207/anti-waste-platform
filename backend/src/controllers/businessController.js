// backend/src/controllers/businessController.js

const { Business } = require('../models');

// Create a new business
exports.createBusiness = async (req, res) => {
    try {
        const business = new Business(req.body);
        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single business by ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a business by ID
exports.updateBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};