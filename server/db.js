import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = 'ftp-soft-25',
  DB_NAME = 'saas_research',
  DB_PORT = 3306
} = process.env;

let pool;

async function ensureDatabase() {
  const tmpConn = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: DB_PORT });
  await tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await tmpConn.end();
}

export async function initDB() {
  await ensureDatabase();

  pool = mysql.createPool({ 
    host: DB_HOST, 
    user: DB_USER, 
    password: DB_PASSWORD, 
    database: DB_NAME, 
    waitForConnections: true, 
    connectionLimit: 10, 
    port: DB_PORT 
  });

  // Create tables...
  await pool.query(`CREATE TABLE IF NOT EXISTS navigation (id INT PRIMARY KEY AUTO_INCREMENT, brandName VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS nav_links (id INT PRIMARY KEY AUTO_INCREMENT, navigation_id INT, name VARCHAR(255), href VARCHAR(255), FOREIGN KEY (navigation_id) REFERENCES navigation(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS hero (id INT PRIMARY KEY AUTO_INCREMENT, badge VARCHAR(255), title_prefix VARCHAR(255), title_highlight VARCHAR(255), title_suffix VARCHAR(255), description TEXT, cta_primary VARCHAR(255), cta_secondary VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS feature_cards (id INT PRIMARY KEY AUTO_INCREMENT, icon VARCHAR(255), label VARCHAR(255), color VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS crisis (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), description TEXT, statusBadge VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS crisis_issues (id INT PRIMARY KEY AUTO_INCREMENT, crisis_id INT, issue_text TEXT, FOREIGN KEY (crisis_id) REFERENCES crisis(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS process (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), description TEXT) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS process_steps (id INT PRIMARY KEY AUTO_INCREMENT, process_id INT, step_index INT, title VARCHAR(255), description TEXT, icon VARCHAR(255), FOREIGN KEY (process_id) REFERENCES process(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS beta (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), description TEXT, waitlistPrompt VARCHAR(255), cta VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS beta_benefits (id INT PRIMARY KEY AUTO_INCREMENT, beta_id INT, benefit TEXT, FOREIGN KEY (beta_id) REFERENCES beta(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS faq (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS faq_items (id INT PRIMARY KEY AUTO_INCREMENT, faq_id INT, q TEXT, a TEXT, FOREIGN KEY (faq_id) REFERENCES faq(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS news (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), subtitle VARCHAR(255), cta VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS news_articles (id INT PRIMARY KEY AUTO_INCREMENT, news_id INT, date VARCHAR(255), title VARCHAR(255), category VARCHAR(255), FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS contact (id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255), description TEXT, email VARCHAR(255)) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS contact_form_fields (id INT PRIMARY KEY AUTO_INCREMENT, contact_id INT, field_key VARCHAR(255), field_label VARCHAR(255), FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS footer (id INT PRIMARY KEY AUTO_INCREMENT, brand VARCHAR(255), copyright TEXT) ENGINE=InnoDB;`);
  await pool.query(`CREATE TABLE IF NOT EXISTS footer_links (id INT PRIMARY KEY AUTO_INCREMENT, footer_id INT, name VARCHAR(255), href VARCHAR(255), FOREIGN KEY (footer_id) REFERENCES footer(id) ON DELETE CASCADE) ENGINE=InnoDB;`);

  // Independent check for 'process' table seeding
  const [procRows] = await pool.query('SELECT COUNT(*) as cnt FROM process');
  if (procRows && procRows[0] && procRows[0].cnt === 0) {
    const { LANDING_DATA } = await import('./data.ts');
    const process = LANDING_DATA.process || {};
    const [processRes] = await pool.query('INSERT INTO process (title, description) VALUES (?, ?)', [process.title, process.description]);
    const processId = processRes.insertId;
    for (let i = 0; i < (process.steps || []).length; i++) {
        const step = process.steps[i];
        await pool.query('INSERT INTO process_steps (process_id, step_index, title, description, icon) VALUES (?, ?, ?, ?, ?)', [processId, i, step.title, step.description, step.icon]);
    }
  }

  // If navigation is empty, seed EVERYTHING else
  const [navRows] = await pool.query('SELECT COUNT(*) as cnt FROM navigation');
  if (navRows && navRows[0] && navRows[0].cnt === 0) {
    const { LANDING_DATA } = await import('./data.ts');

    const [navRes] = await pool.query('INSERT INTO navigation (brandName) VALUES (?)', [LANDING_DATA.navigation.brandName]);
    const navigationId = navRes.insertId;
    for (const link of LANDING_DATA.navigation.navLinks) {
       await pool.query('INSERT INTO nav_links (navigation_id, name, href) VALUES (?, ?, ?)', [navigationId, link.name, link.href]);
    }

    const title = LANDING_DATA.hero.title || {};
    await pool.query('INSERT INTO hero (badge, title_prefix, title_highlight, title_suffix, description, cta_primary, cta_secondary) VALUES (?, ?, ?, ?, ?, ?, ?)', [LANDING_DATA.hero.badge, title.prefix, title.highlight, title.suffix, LANDING_DATA.hero.description, LANDING_DATA.hero.cta.primary, LANDING_DATA.hero.cta.secondary]);

    for (const card of LANDING_DATA.featureCards || []) {
       await pool.query('INSERT INTO feature_cards (icon, label, color) VALUES (?, ?, ?)', [card.icon, card.label, card.color]);
    }

    const crisis = LANDING_DATA.crisis || {};
    const [crisisRes] = await pool.query('INSERT INTO crisis (title, description, statusBadge) VALUES (?, ?, ?)', [crisis.title, crisis.description, crisis.statusBadge]);
    for (const issue of crisis.issues || []) {
       await pool.query('INSERT INTO crisis_issues (crisis_id, issue_text) VALUES (?, ?)', [crisisRes.insertId, issue]);
    }

    const beta = LANDING_DATA.beta || {};
    const [betaRes] = await pool.query('INSERT INTO beta (title, description, waitlistPrompt, cta) VALUES (?, ?, ?, ?)', [beta.title, beta.description, beta.waitlistPrompt, beta.cta]);
    for (const b of beta.benefits || []) {
       await pool.query('INSERT INTO beta_benefits (beta_id, benefit) VALUES (?, ?)', [betaRes.insertId, b]);
    }

    const faq = LANDING_DATA.faq || {};
    const [faqRes] = await pool.query('INSERT INTO faq (title) VALUES (?)', [faq.title]);
    for (const item of faq.faqs || []) {
       await pool.query('INSERT INTO faq_items (faq_id, q, a) VALUES (?, ?, ?)', [faqRes.insertId, item.q, item.a]);
    }

    const news = LANDING_DATA.news || {};
    const [newsRes] = await pool.query('INSERT INTO news (title, subtitle, cta) VALUES (?, ?, ?)', [news.title, news.subtitle, news.cta]);
    for (const art of news.articles || []) {
       await pool.query('INSERT INTO news_articles (news_id, date, title, category) VALUES (?, ?, ?, ?)', [newsRes.insertId, art.date, art.title, art.category]);
    }

    const contact = LANDING_DATA.contact || {};
    const [contactRes] = await pool.query('INSERT INTO contact (title, description, email) VALUES (?, ?, ?)', [contact.title, contact.description, contact.email]);
    const form = contact.form || {};
    for (const key of Object.keys(form)) {
       await pool.query('INSERT INTO contact_form_fields (contact_id, field_key, field_label) VALUES (?, ?, ?)', [contactRes.insertId, key, form[key]]);
    }

    const footer = LANDING_DATA.footer || {};
    const [footerRes] = await pool.query('INSERT INTO footer (brand, copyright) VALUES (?, ?)', [footer.brand, footer.copyright]);
    for (const link of footer.links || []) {
       await pool.query('INSERT INTO footer_links (footer_id, name, href) VALUES (?, ?, ?)', [footerRes.insertId, link.name, link.href]);
    }
  }
}

export async function getNavigation() {
  const [navRows] = await pool.query('SELECT id, brandName FROM navigation LIMIT 1');
  if (!navRows || navRows.length === 0) return null;
  const nav = navRows[0];
  const [links] = await pool.query('SELECT name, href FROM nav_links WHERE navigation_id = ?', [nav.id]);
  return { brandName: nav.brandName, navLinks: links };
}

export async function getHero() {
  const [rows] = await pool.query('SELECT badge, title_prefix, title_highlight, title_suffix, description, cta_primary, cta_secondary FROM hero LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const r = rows[0];
  return { 
    badge: r.badge, 
    title: { prefix: r.title_prefix, highlight: r.title_highlight, suffix: r.title_suffix }, 
    description: r.description, 
    cta: { primary: r.cta_primary, secondary: r.cta_secondary } 
  };
}

export async function getFeatureCards() {
  const [rows] = await pool.query('SELECT icon, label, color FROM feature_cards');
  return rows;
}

export async function getCrisis() {
  const [rows] = await pool.query('SELECT id, title, description, statusBadge FROM crisis LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const c = rows[0];
  const [issues] = await pool.query('SELECT issue_text FROM crisis_issues WHERE crisis_id = ?', [c.id]);
  return { 
    title: c.title, 
    description: c.description, 
    issues: issues.map(i => i.issue_text), 
    statusBadge: c.statusBadge 
  };
}

export async function getProcess() {
  const [rows] = await pool.query('SELECT id, title, description FROM process LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const p = rows[0];
  const [steps] = await pool.query('SELECT title, description, icon FROM process_steps WHERE process_id = ? ORDER BY step_index', [p.id]);
  return { title: p.title, description: p.description, steps };
}

export async function getBeta() {
  const [rows] = await pool.query('SELECT id, title, description, waitlistPrompt, cta FROM beta LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const b = rows[0];
  const [bens] = await pool.query('SELECT benefit FROM beta_benefits WHERE beta_id = ?', [b.id]);
  return { 
    title: b.title, 
    description: b.description, 
    waitlistPrompt: b.waitlistPrompt, 
    benefits: bens.map(x => x.benefit), 
    cta: b.cta 
  };
}

export async function getFAQ() {
  const [rows] = await pool.query('SELECT id, title FROM faq LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const f = rows[0];
  const [items] = await pool.query('SELECT q, a FROM faq_items WHERE faq_id = ?', [f.id]);
  return { title: f.title, faqs: items };
}

export async function getNews() {
  const [rows] = await pool.query('SELECT id, title, subtitle, cta FROM news LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const n = rows[0];
  const [arts] = await pool.query('SELECT date, title, category FROM news_articles WHERE news_id = ?', [n.id]);
  return { title: n.title, subtitle: n.subtitle, cta: n.cta, articles: arts };
}

export async function getContact() {
  const [rows] = await pool.query('SELECT id, title, description, email FROM contact LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const c = rows[0];
  const [fields] = await pool.query('SELECT field_key, field_label FROM contact_form_fields WHERE contact_id = ?', [c.id]);
  const form = {};
  for (const f of fields) form[f.field_key] = f.field_label;
  return { title: c.title, description: c.description, email: c.email, form };
}

export async function getFooter() {
  const [rows] = await pool.query('SELECT id, brand, copyright FROM footer LIMIT 1');
  if (!rows || rows.length === 0) return null;
  const f = rows[0];
  const [links] = await pool.query('SELECT name, href FROM footer_links WHERE footer_id = ?', [f.id]);
  return { brand: f.brand, links, copyright: f.copyright };
}

export async function getData() {
  return {
    navigation: await getNavigation(),
    hero: await getHero(),
    featureCards: await getFeatureCards(),
    crisis: await getCrisis(),
    process: await getProcess(),
    beta: await getBeta(),
    faq: await getFAQ(),
    news: await getNews(),
    contact: await getContact(),
    footer: await getFooter()
  };
}

export async function upsertData(obj) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const children = [
      'nav_links','feature_cards','crisis_issues','process_steps','beta_benefits','faq_items','news_articles','contact_form_fields','footer_links'
    ];
    for (const t of children) await conn.query(`DELETE FROM ${t}`);

    const parents = [
      'navigation','hero','crisis','process','beta','faq','news','contact','footer'
    ];
    for (const t of parents) await conn.query(`DELETE FROM ${t}`);

    if (obj.navigation) {
      const [r] = await conn.query('INSERT INTO navigation (brandName) VALUES (?)', [obj.navigation.brandName]);
      for (const link of obj.navigation.navLinks || []) {
        await conn.query('INSERT INTO nav_links (navigation_id, name, href) VALUES (?, ?, ?)', [r.insertId, link.name, link.href]);
      }
    }

    if (obj.hero) {
      const t = obj.hero.title || {};
      await conn.query('INSERT INTO hero (badge, title_prefix, title_highlight, title_suffix, description, cta_primary, cta_secondary) VALUES (?, ?, ?, ?, ?, ?, ?)', [obj.hero.badge, t.prefix, t.highlight, t.suffix, obj.hero.description, obj.hero.cta?.primary, obj.hero.cta?.secondary]);
    }

    for (const card of obj.featureCards || []) {
      await conn.query('INSERT INTO feature_cards (icon, label, color) VALUES (?, ?, ?)', [card.icon, card.label, card.color]);
    }

    if (obj.crisis) {
      const [cr] = await conn.query('INSERT INTO crisis (title, description, statusBadge) VALUES (?, ?, ?)', [obj.crisis.title, obj.crisis.description, obj.crisis.statusBadge]);
      for (const issue of obj.crisis.issues || []) {
        await conn.query('INSERT INTO crisis_issues (crisis_id, issue_text) VALUES (?, ?)', [cr.insertId, issue]);
      }
    }

    if (obj.process) {
      const [pr] = await conn.query('INSERT INTO process (title, description) VALUES (?, ?)', [obj.process.title, obj.process.description]);
      for (let i = 0; i < (obj.process.steps || []).length; i++) {
        const step = obj.process.steps[i];
        await conn.query('INSERT INTO process_steps (process_id, step_index, title, description, icon) VALUES (?, ?, ?, ?, ?)', [pr.insertId, i, step.title, step.description, step.icon]);
      }
    }

    if (obj.beta) {
      const [br] = await conn.query('INSERT INTO beta (title, description, waitlistPrompt, cta) VALUES (?, ?, ?, ?)', [obj.beta.title, obj.beta.description, obj.beta.waitlistPrompt, obj.beta.cta]);
      for (const b of obj.beta.benefits || []) {
        await conn.query('INSERT INTO beta_benefits (beta_id, benefit) VALUES (?, ?)', [br.insertId, b]);
      }
    }

    if (obj.faq) {
      const [fr] = await conn.query('INSERT INTO faq (title) VALUES (?)', [obj.faq.title]);
      for (const item of obj.faq.faqs || []) {
        await conn.query('INSERT INTO faq_items (faq_id, q, a) VALUES (?, ?, ?)', [fr.insertId, item.q, item.a]);
      }
    }

    if (obj.news) {
      const [nr] = await conn.query('INSERT INTO news (title, subtitle, cta) VALUES (?, ?, ?)', [obj.news.title, obj.news.subtitle, obj.news.cta]);
      for (const art of obj.news.articles || []) {
        await conn.query('INSERT INTO news_articles (news_id, date, title, category) VALUES (?, ?, ?, ?)', [nr.insertId, art.date, art.title, art.category]);
      }
    }

    if (obj.contact) {
      const [cr] = await conn.query('INSERT INTO contact (title, description, email) VALUES (?, ?, ?)', [obj.contact.title, obj.contact.description, obj.contact.email]);
      const form = obj.contact.form || {};
      for (const key of Object.keys(form)) {
        await conn.query('INSERT INTO contact_form_fields (contact_id, field_key, field_label) VALUES (?, ?, ?)', [cr.insertId, key, form[key]]);
      }
    }

    if (obj.footer) {
      const [fr] = await conn.query('INSERT INTO footer (brand, copyright) VALUES (?, ?)', [obj.footer.brand, obj.footer.copyright]);
      for (const link of obj.footer.links || []) {
        await conn.query('INSERT INTO footer_links (footer_id, name, href) VALUES (?, ?, ?)', [fr.insertId, link.name, link.href]);
      }
    }

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function closePool() {
  if (pool) await pool.end();
}

export default {
  initDB,
  getNavigation,
  getHero,
  getFeatureCards,
  getCrisis,
  getProcess,
  getBeta,
  getFAQ,
  getNews,
  getContact,
  getFooter,
  closePool
};
