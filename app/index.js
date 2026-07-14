// index.fixed.js
// The "AFTER" version - same app, with all 3 vulnerabilities fixed.
//
// FIX 1: secret now comes from an environment variable, never committed.
// FIX 2: eval() replaced with a safe, sandboxed expression evaluator (mathjs).
// FIX 3: lodash upgraded to a patched version - see package.fixed.json.

const express = require('express');
const { evaluate } = require('mathjs');
const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

app.post('/calc', (req, res) => {
  const expression = req.body.expression;
  try {
    const result = evaluate(expression); // sandboxed, no arbitrary code execution
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}`));

module.exports = app;
