const parse = require("node-html-parser").parse;

const moneyControlwebPageScrapper = async (url) => {
  const response = await fetch(url, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "sec-ch-ua":
        '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  });

  const data = await response.text();

  const parsedHtml = parse(data);

  const contentData = parsedHtml.querySelector("#contentdata");
  const gettingAllPassage = contentData.querySelectorAll("p");

  article = "";
  gettingAllPassage.forEach((passage) => {
    // console.log(passage.innerText);
    // return;
    passageText = passage.innerText;
    article = article + passageText;
  });

  return article;
  //   console.log(article);
};

// moneyControlwebPageScrapper(
//   "https://www.moneycontrol.com/news/business/markets/zomatos-second-straight-quarter-of-profit-impresses-brokerages-triggers-price-target-hikes-11669871.html"
// );
module.exports = moneyControlwebPageScrapper;
