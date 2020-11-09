const puppeteer = require('puppeteer');

let page, browser;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
  await browser.close();
});

describe('Homepage', () => {
  test('h1 loads correctly', async () => {
    await page.waitForSelector('.site-title');

    const html = await page.$eval('.site-title', (e) => e.innerHTML);
    expect(html).toBe('GitHub User Repository Lookup');
  }, 10000);

  test('search form loads correctly', async () => {
    const label = await page.$eval('form label', (el) => el.innerHTML);
    expect(label).toEqual('User:');
  });
});
