const replaceTemplate = (template, element) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, element.productName);
  output = output.replace(/{%IMAGE%}/g, element.image);
  output = output.replace(/{%FROM%}/g, element.from);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%NUTRIENTS%}/g, element.nutrients.join(' '));
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);
  output = output.replace(/{%ID%}/g, element.ID);

  if (!element.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
}


module.exports = {
  replaceTemplate
}