const helpers = require('./helpers');

describe('helpers utilities', () => {
  test('generateSecureCode returns a code with the expected prefix and format', () => {
    const code = helpers.generateSecureCode();

    expect(code).toMatch(/^RET-\d{4}$/);
  });

  test('formatPrice converts values to two decimal places', () => {
    expect(helpers.formatPrice(12.345)).toBe('12.35');
    expect(helpers.formatPrice('5')).toBe('5.00');
  });

  test('calculateCO2Savings multiplies the amount by 0.5', () => {
    expect(helpers.calculateCO2Savings(10)).toBe(5);
    expect(helpers.calculateCO2Savings(0)).toBe(0);
  });
});
