const express = require("express");
const webScrapper = require("./helper/investing_news_scrapper");
const moneyControllerwebScrapper = require("./helper/money_control_scrapper");
const moneyControlwebPageScrapper = require("./helper/webpage_money_control");

const app = express();
const port = 5500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is testing root");
});

app.get("/investing_news", async (req, res) => {
  response = await webScrapper(req.query.url);
  res.send(response);
});

app.get("/money_control_webpage", async (req, res) => {
  response = await moneyControlwebPageScrapper(req.query.url);
  res.send(response);
});

app.get("/money_control", async (req, res) => {
  response = await moneyControllerwebScrapper(req.query.url);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
