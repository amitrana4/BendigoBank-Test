/**
 * Simulates a vendor commission calculation based on risk profiles.
 */
function calculateCommission(loanAmount, loanTermInMonths, riskBand) {
  const amount = parseFloat(loanAmount);
  const term = parseInt(loanTermInMonths, 10);

  if (isNaN(amount) || amount <= 0) throw new Error('Invalid loan amount');
  if (isNaN(term) || term <= 0) throw new Error('Invalid loan term');

  // Base rate mapping dependent on risk
  const riskRates = {
    'A': 0.015, // 1.5%
    'B': 0.025, // 2.5%
    'C': 0.040, // 4.0%
  };

  const commissionRate = riskRates[riskBand.toUpperCase()] || 0.050; // Default or higher risk fallback
  
  // Basic simulation formula: Rate adjusted slightly higher for longer terms
  const adjustedRate = commissionRate + (term > 36 ? 0.005 : 0);
  const totalCommission = Math.round((amount * adjustedRate) * 100) / 100;

  return {
    quoteId: `QT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    commissionRate: adjustedRate,
    totalCommission: totalCommission
  };
}

module.exports = { calculateCommission };
