module.exports = function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  const VALID_KEY = process.env.VENDOR_API_KEY || 'BendigoBank-super-secret-vendor-key';

  if (!apiKey || apiKey !== VALID_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key.' });
  }
  next();
};
