const puppeteer = require("puppeteer");
const start = Date.now();

const ssr = async function ssr(url, fileName) {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector("#offcanvas_header_loder"); // ensure #posts exists in the DOM.
    const bodyHandle = await page.$("#km-fixed-header");
    const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    // const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();
    const ttRenderMs = Date.now() - start;
    return { html, ttRenderMs };
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = ssr;
