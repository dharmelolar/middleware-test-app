const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Middleware!');
});

app.get('/error', (req, res) => {
  throw new Error('Simulated error for testing Ops AI');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
