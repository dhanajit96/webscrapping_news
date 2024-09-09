const launchPuppeteerProduction = async () => {
  const puppeteer = require("puppeteer-extra");
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    executablePath: "/snap/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
    ],
    slowMo: 10,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  return browser;
};

const launchPuppeteerDevelopment = async () => {
  const puppeteer = require("puppeteer");
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
    ],
    // defaultViewport: {
    //   width:1920,
    //   height:1080
    // }
  });
  return browser;
};

const launchPuppeteer = async () => {
  let browser = null;
  if (process.env.NODE_ENV === "production") {
    browser = await launchPuppeteerProduction();
  } else {
    browser = await launchPuppeteerDevelopment();
  }

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );

  return {
    page: page,
    browser: browser,
  };
};

module.exports = launchPuppeteer;
