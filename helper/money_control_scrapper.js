const parse = require("node-html-parser").parse;

const moneyControllerwebScrapper = async (url) => {
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

  const output = [];
  const data = await response.text();

  const parsedHtml = parse(data);

  const categoryElement = parsedHtml.querySelector("#cagetory");
  const arrayOfArticles = categoryElement?.querySelectorAll("li") || [];

  if (arrayOfArticles.length === 0) {
    return [];
  }

  arrayOfArticles.forEach((element) => {
    const titleElement = element.querySelector("h2 > a");
    const title = titleElement?.innerText?.trim();

    const articleLink = element?.innerHTML;

    const regexPattern = /["'](.*?)[\"']/g;

    const match = regexPattern.exec(articleLink);

    console.log(articleLink);
    // const boodyLink = titleElement?.href;

    const body = element.querySelector("p")?.innerText?.trim();

    const time = element.querySelector("span")?.innerText?.trim();

    output.push({
      title: title,
      body: body,
      articleLink: match?.[match?.length - 1] ?? null,
      time: time,
    });
  });

  console.log(url);

  return output;
};

module.exports = moneyControllerwebScrapper;
