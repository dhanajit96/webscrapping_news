const sensibull_login = async (page) => {
  const elements = await page.$x(
    '//*[@id="app"]/div/div[3]/div[1]/div/div[2]/button[1]/span[2]'
  );
  await elements[0].click();

  
};

module.exports = function_expose;
