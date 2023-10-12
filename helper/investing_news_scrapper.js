const parse = require("node-html-parser").parse;
const CircularJSON = require("circular-json");

const webScrapper = async (url) => {
  const response = await fetch(url, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua":
        '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        'page_equity_viewed=0; adBlockerNewUserDomains=1686063666; udid=01e9524899dcf0996ab5295192a80844; protectedMedia=2; _cc_id=ae15e9fd80c683c78a0936dceb188a53; ext_name=ojplmecpdpgccookcobabopnaifgidhf; _hjSessionUser_174945=eyJpZCI6ImFkMDQ4Y2FhLTc3NzAtNTJhYy1iZTM0LTlkMGI3NTEwYjVmNyIsImNyZWF0ZWQiOjE2ODYwNzA4ODIxMTAsImV4aXN0aW5nIjp0cnVlfQ==; __gpi=UID=00000c14bc821e64:T=1687189047:RT=1687787135:S=ALNI_Mai32oZoZE7XPi_5FeYUKRZO61oQA; im_sharedid=b20538e8-9193-4906-bc2e-34883ddc9142; lifetime_page_view_count=2; user-browser-sessions=11; show_promo_ancmt_popup=yes; gtmFired=OK; __cflb=02DiuGRugds2TUWHMkimYPAcC3JQrXKkAnqUmAbRu2M8x; _gid=GA1.2.413625519.1696775207; r_p_s_n=1; _imntz_error=0; _pbjs_userid_consent_data=3524755945110770; pms={"f":2,"s":2}; panoramaId_expiry=1696861603658; panoramaId=9f868e58a5285d9ba5eb30d18f64a9fb927a5161fc9bd5ff67a437d1c08226cf; panoramaIdType=panoDevice; connectId={"lastUsed":1696775208483,"lastSynced":1696775208483}; editionPostpone=1696775211870; _lr_env_src_ats=false; pbjs-unifiedid=%7B%22TDID%22%3A%225caedaba-cef7-4a52-9dd5-7c1a3cc7ce95%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222023-09-08T14%3A26%3A49%22%7D; pbjs-unifiedid_last=Sun%2C%2008%20Oct%202023%2014%3A26%3A54%20GMT; adsFreeSalePopUp=2; _ga=GA1.1.1263371953.1686063677; hide_promo_strip=1; cto_bundle=-10eeV80V0VuWkhxRG8xZ09kVVA4TDUxdEh6TjNhQ0k3c3c0NkFaenFkZUpTSlBZU09BazBIMzhwVVpoVHlIMzV3WXNzZnh1anFtdGZBJTJGODJSNG54U1c3cndQUU5WcVFTV3BNblI0SW5LMnJTUmJYbTYlMkIxdUhlSHQlMkJGSWtTcSUyQkJaMmZDTklKa0RoZWV4VUNNWWduNnpnRjZMRWxGYWVGOXlQeU9xaldicmI2cFF5M2RtU2RNeUVLUm1qZjVGMXZEY0tMWiUyRjBVc2tTSG83eVJZa2lWbnU4NEY0cXA1VERxWFFhQVpjZ1VKT1cwUThFUmJkVElnRTFYdzlhelZtblBkJTJGNldOV3M5WFc4ZSUyRkZjRXRMeDhBV1VqTXNBJTNEJTNE; g_state={"i_p":1699196221996,"i_l":4}; __gads=ID=dc1062a43117863c:T=1687189047:RT=1696777265:S=ALNI_Mbbrm8I8wL593g7KNlWSivyFKCyRg; _ga_C4NDLGKVMK=GS1.1.1696775207.19.1.1696777938.60.0.0',
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  });

  const output = [];
  const data = await response.text();

  const parsedHtml = parse(data);

  const arrayOfArticles = parsedHtml
    .querySelector("#leftColumn > div.largeTitle")
    .querySelectorAll("article");

  arrayOfArticles.forEach((element) => {
    const titleElement = element.querySelector("div.textDiv > a");

    const title = titleElement?.innerText?.trim();

    articleLink = element.querySelector("div.textDiv")?.innerHTML;

    const regexPattern = /["'](.*?)[\"']/g;

    const match = regexPattern.exec(articleLink);

    console.log(match);

    const body = element
      .querySelector("div > p")
      ?.innerText?.trim()
      ?.replace(/&nbsp;/g, "");

    const time = element
      .querySelector("div.textDiv > span > span.date")
      ?.innerText?.trim()
      ?.replace(/&nbsp;/g, "");

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

module.exports = webScrapper;
