const express = require('express');
const app = express();
app.use(express.json());

const API_KEY = 'a8f3k2m9x7q1w4e6r8t0y2u4i6o8p0a2';

app.post('/calc', (req, res) => {
  const expression = req.body.expression;
  const result = eval(expression); 
  res.json({ result });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Demo app listening on port ${PORT}`));

module.exports = app;
