// This file contains utility functions that can be used throughout the application.

const generateSecureCode = () => {
    return `RET-${Math.floor(1000 + Math.random() * 9000)}`; // Generates a random secure code
};

const formatPrice = (price) => {
    return parseFloat(price).toFixed(2); // Formats price to two decimal places
};

const calculateCO2Savings = (amount) => {
    return amount * 0.5; // Example calculation for CO2 savings
};

module.exports = {
    generateSecureCode,
    formatPrice,
    calculateCO2Savings,
};