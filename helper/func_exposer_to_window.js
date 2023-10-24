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
  });
};

module.exports = function_expose;
