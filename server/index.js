import express from 'express';
import { LANDING_DATA } from './data.ts';
import { initDB, getData, upsertData, getNavigation, getHero, getFeatureCards, getCrisis, getProcess, getBeta, getFAQ, getNews, getContact, getFooter } from './db.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Manual CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
});

// GET current landing data
app.get('/api/data', async (req, res) => {
  try {
    const row = await getData();
    if (!row) {
      // Seed DB with default data if empty
      await upsertData(LANDING_DATA);
      return res.json(LANDING_DATA);
    }
    return res.json(row);
  } catch (err) {
    console.error('Error fetching data', err);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Segmented endpoints
app.get('/api/data/navigation', async (req, res) => {
  try {
    const nav = await getNavigation();
    return res.json(nav);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch navigation' });
  }
});

app.get('/api/data/hero', async (req, res) => {
  try {
    const hero = await getHero();
    return res.json(hero);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch hero' });
  }
});

app.get('/api/data/featureCards', async (req, res) => {
  try {
    const cards = await getFeatureCards();
    return res.json(cards);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch feature cards' });
  }
});

app.get('/api/data/crisis', async (req, res) => {
  try {
    const crisis = await getCrisis();
    return res.json(crisis);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch crisis' });
  }
});

app.get('/api/data/process', async (req, res) => {
  try {
    const process = await getProcess();
    return res.json(process);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch process' });
  }
});

app.get('/api/data/beta', async (req, res) => {
  try {
    const beta = await getBeta();
    return res.json(beta);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch beta' });
  }
});

app.get('/api/data/faq', async (req, res) => {
  try {
    const faq = await getFAQ();
    return res.json(faq);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch faq' });
  }
});

app.get('/api/data/news', async (req, res) => {
  try {
    const news = await getNews();
    return res.json(news);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/data/contact', async (req, res) => {
  try {
    const contact = await getContact();
    return res.json(contact);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

app.get('/api/data/footer', async (req, res) => {
  try {
    const footer = await getFooter();
    return res.json(footer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch footer' });
  }
});

// POST or PUT to update landing data (replace whole object)
app.post('/api/data', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') return res.status(400).json({ error: 'Invalid payload' });
    await upsertData(payload);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error upserting data', err);
    return res.status(500).json({ error: 'Failed to save data' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    await initDB();
    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
