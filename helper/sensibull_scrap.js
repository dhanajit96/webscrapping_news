const launchPuppeteer = require("./launch_puppeteer");
const function_expose = require("./func_exposer_to_window");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

const scrap_data_from_sensibull = async () => {
  const { browser, page } = await launchPuppeteer();

  const params = {
    expiry: "2023-10-19",
    tradingsymbol: "NIFTY",
  };

  // Create the base URL
  const baseUrl = "https://web.sensibull.com/option-chain";

  // Use the URLSearchParams API to build the URL
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();

  // Get the final URL as a string
  const finalUrl = url.toString();

  await page.goto(finalUrl);
  await delay(3000);

  await page.waitForSelector("#oc-table-body");

  await function_expose(page);

  const elements = await page.$x(
    '//*[@id="app"]/div/div[3]/div[2]/div/div/div[4]/div/div[3]/button[1]/span/div'
  );
  await elements[0].click();
  await page.waitForSelector("#oc-table-body");

  // await page.exposeFunction("get_cell_record", get_cell_record);

  resultant_array = await page.evaluate(async () => {
    resultant_array = [];
    const response = await login_with_google();

    const all_data_fetched = document.querySelector("#oc-table-body");

    const all_record = all_data_fetched.querySelectorAll("div.rt-tr-group");
    all_record.forEach((element) => {
      io_change_percent = get_cell_record(element);
      const values = io_change_percent.split("\n");

      //   const resultObject = {
      //     call_io_change: values[0],
      //     call_io_lakh: values[1],
      //     call_ltp: values[2],
      //     strike: values[3],
      //     iv: values[4],
      //     put_ltp: values[5],
      //     put_io_lakh: values[6],
      //     put_io_change: values[7],
      //   };
      resultant_array.push({ innertext: values });
    });
    return resultant_array;
  });

  // await browser.close();

  return resultant_array;
};

scrap_data_from_sensibull()
  .then((result) => {
    // Handle the result
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
