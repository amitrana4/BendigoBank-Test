const { calculateCommission } = require('../src/services/quoteEngine');

// Running test cases
describe('Commission Quote Engine Tests', () => {
  test('should calculate correct commission for Low Risk (Band A)', () => {
    const result = calculateCommission(10000, 24, 'A');
    expect(result).toHaveProperty('quoteId');
    expect(result.commissionRate).toBe(0.015);
    expect(result.totalCommission).toBe(150);
  });

    test('should adjust rate upward for long term durations', () => {
    const result = calculateCommission(10000, 48, 'B'); // 48 months > 36 months
    expect(result.commissionRate).toBeCloseTo(0.030, 5); 
    });


  test('should throw an error for invalid negative numbers', () => {
    expect(() => calculateCommission(-500, 12, 'A')).toThrow('Invalid loan amount');
  });
});
