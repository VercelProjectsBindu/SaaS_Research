import express from 'express';
import { LANDING_DATA } from './data.ts';

const app = express();
const port = 3001;

app.use(express.json());

// Manual CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
});

app.get('/api/data', (req, res) => {
  res.json(LANDING_DATA);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
