import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ loanAmount: '', loanTermInMonths: '36', riskBand: 'A' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      // Connects to your running backend API port
      const response = await fetch('http://localhost:5001/api/v1/commission/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'super-secret-vendor-key' // Secure header handshake requirement
        },
        body: JSON.stringify({
          loanAmount: parseFloat(formData.loanAmount),
          loanTermInMonths: parseInt(formData.loanTermInMonths, 10),
          riskBand: formData.riskBand
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong fetching the quote.');
      }

      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', fontFamily: 'system-ui, sans-serif', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>📋 Commission Quote Generator</h2>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.9em', color: '#64748b' }}>Lending Platform Internal Operations Portal</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Loan Amount ($)</label>
          <input 
            type="number" 
            min="1000" 
            required
            value={formData.loanAmount}
            onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
            placeholder="e.g. 25000"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Term Duration (Months)</label>
          <input 
            type="number" 
            min="1" max="84" 
            required
            value={formData.loanTermInMonths}
            onChange={(e) => setFormData({...formData, loanTermInMonths: e.target.value})}
            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>Risk Classification Band</label>
          <select 
            value={formData.riskBand} 
            onChange={(e) => setFormData({...formData, riskBand: e.target.value})}
            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#fff' }}
          >
            <option value="A">Band A (Lower Risk Tier)</option>
            <option value="B">Band B (Medium Risk Tier)</option>
            <option value="C">Band C (Higher Risk Tier)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', background: loading ? '#94a3b8' : '#0066cc', color: '#fff', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1em', transition: 'background 0.2s' }}
        >
          {loading ? 'Processing Quote Request...' : 'Generate Quote'}
        </button>
      </form>

      {/* Edge-Case / API Failure Notice Area */}
      {error && (
        <div style={{ marginTop: '20px', padding: '14px', background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '6px' }}>
          <strong style={{ display: 'block', marginBottom: '4px' }}>⚠️ Request Interrupted:</strong> 
          <span>{error}</span>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85em', color: '#b91c1c' }}>Please try triggering the calculation request again to bypass simulated network flakiness.</p>
        </div>
      )}

      {/* Quote Value Render Output */}
      {quote && (
        <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#0369a1', borderBottom: '1px solid #e0f2fe', paddingBottom: '6px' }}>✅ Quote Successfully Rendered</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95em', color: '#334155' }}>
            <div><strong>Transaction Reference ID:</strong> <span style={{ fontFamily: 'monospace', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>{quote.quoteId}</span></div>
            <div><strong>Assigned Commission Rate:</strong> {(quote.commissionRate * 100).toFixed(2)}%</div>
            <div style={{ fontSize: '1.2em', color: '#0369a1', marginTop: '4px' }}><strong>Total Payout Value:</strong> <span style={{ fontWeight: '700' }}>${quote.totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
