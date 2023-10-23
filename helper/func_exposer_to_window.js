const function_expose = async (page) => {
  await page.evaluate(() => {
    window.get_cell_record = (element) => {
      const io_cell = element.querySelector("div");

      if (io_cell) {
        const innerText = io_cell.innerText;
        return innerText;
      } else {
        // Handle the case where the element is not found, e.g., return a default value or throw an error.
        return "Element not found";
      }
    };
    window.login_with_google = async () => {
      const response = await fetch(
        "https://api.sensibull.com/v1/login_with_google?",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "frt-ref": "dn78uouqdlg",
            "sec-ch-ua":
              '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-device-id": "bcd57234-c026-4840-b629-334df056b4c3",
          },
          referrer: "https://web.sensibull.com/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: '{"request_token":"4/0AfJohXkIMVbbL6yS2zMA5-JXGeXa_DeKi-KvB9mjKtr0-J6v8R02mUqwBbLvJSY04gve2Q"}',
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      );
      return await response.json();
    };
  });
};

module.exports = function_expose;
