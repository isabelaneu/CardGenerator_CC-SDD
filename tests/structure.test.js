const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');

function readHtml() {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
  return fs.readFileSync(htmlPath, 'utf8');
}

function has(html, pattern, message) {
  assert.match(html, pattern, message);
}

test('index.html provides the main layout shell', () => {
  const html = readHtml();

  has(html, /<main[^>]*class="[^"]*\blayout\b/i, 'main layout shell is missing');
  has(html, /<link[^>]+href=["']styles\/styles\.css["']/i, 'styles.css is not linked');
  has(html, /<script[^>]+src=["']script\.js["']/i, 'script.js is not linked');
});

test('index.html includes the card creation form fields', () => {
  const html = readHtml();

  has(html, /<form[^>]*id=["']card-form["']/i, 'card form is missing');
  has(html, /id=["']name["']/i, 'name field is missing');
  has(html, /id=["']job-title["']/i, 'job title field is missing');
  has(html, /id=["']email["']/i, 'email field is missing');
  has(html, /id=["']social-links["']/i, 'social links field is missing');
  has(html, /id=["']theme["']/i, 'theme field is missing');
});

test('index.html includes the preview panel and saved card list', () => {
  const html = readHtml();

  has(html, /id=["']card-preview["']/i, 'preview panel is missing');
  has(html, /id=["']saved-cards["']/i, 'saved card list is missing');
});
