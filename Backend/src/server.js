const express = require('express');
const cors = require('cors');
const validateApiKey = require('./middleware/auth');
const { calculateCommission } = require('./services/quoteEngine');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/v1/commission/quote', validateApiKey, (req, res) => {
  const { loanAmount, loanTermInMonths, riskBand } = req.body;

  // 1. Edge Case Handling: Randomly throw a vendor network error (20% probability)
  if (Math.random() < 0.20) {
    return res.status(503).json({ error: 'Vendor API is temporarily unavailable (Simulated Flakiness).' });
  }

  // 2. Input Validation
  if (!loanAmount || !loanTermInMonths || !riskBand) {
    return res.status(400).json({ error: 'Missing required parameters: loanAmount, loanTermInMonths, riskBand.' });
  }

  try {
    const result = calculateCommission(loanAmount, loanTermInMonths, riskBand);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Mock Vendor API is live on http://localhost:${PORT}`);
});

module.exports = app;
