// index.js
// Simple Express app used to demonstrate a Secure SDLC / DevSecOps pipeline.
// This is the "BEFORE" version - it intentionally contains 3 common
// vulnerabilities so the pipeline can catch them automatically.

const express = require('express');
const app = express();
app.use(express.json());

// VULNERABILITY 1: Hardcoded secret in source code.
// Should never be committed to git - caught by secrets scanning (Gitleaks)
// and static analysis (Semgrep).
const API_KEY = 'sk-demo-hardcoded-key-12345';

// VULNERABILITY 2: eval() run on user-supplied input.
// This lets an attacker run arbitrary JavaScript on the server - a
// classic code injection flaw. Caught by static analysis (Semgrep).
app.post('/calc', (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression); // NEVER do this with untrusted input
  res.json({ result });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}`));

module.exports = app;

// VULNERABILITY 3 is NOT in this file - it's in package.json, where an
// outdated version of the "lodash" library with a known CVE is listed
// as a dependency. This is caught by dependency scanning (npm audit).
