// Server
const http = require('http');
const url = require('url');
const fs = require('fs');

// Lee el archivo JSON correctamente
const data = fs.readFileSync(`${__dirname}/dev-data/fruits.json`, 'utf-8');

const replaceTemplate = (template, element) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, element.productName);
  output = output.replace(/{%IMAGE%}/g, element.image);
  output = output.replace(/{%FROM%}/g, element.from);
  output = output.replace(/{%PRICE%}/g, element.price);
  output = output.replace(/{%NUTRIENTS%}/g, ...element.nutrients);
  output = output.replace(/{%QUANTITY%}/g, element.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, element.description);
  output = output.replace(/{%ID%}/g, element.ID);

  if (!element.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output
}

// read templates
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const productsObject = JSON.parse(data);

// Tabla de rutas (lookup table)
const pathName = {
  '/overview': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = productsObject.map((element) => replaceTemplate(templateCard, element)).join('') // .join('') convierte un array de strings en un solo string concatenado, sin separadores.

    const ouput = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(ouput);
  },
  '/product': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Im Juan');
  },
  '/api': (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productsObject));
  },
  '/': (res) => {
    res.writeHead(200, { 
        'Content-Type': 'text/html',
        'my-own-header': 'Hello baby, can you see me ñ.ñr?'
     });
    res.end(templateOverview);
  },
};

// Crear el servidor
const server = http.createServer((req, res) => {
  const page = pathName[req.url]; // Busca la ruta en el objeto
  
  if (page) {
    page(res);
  } else {
    // I need to define the http status code and the header before to send the response
    res.writeHead(404, { 
      'Content-Type': 'text/html',
      'secret-message': 'No este molestando mijo deje mamar, no hay nada, lalalalal'
     });
    res.end('<h1>404 Not Found</h1>');
  }
});

// Iniciar el servidor
server.listen(9222, 'localhost', () => {
  console.log("I'm alive bitch!! xd http://localhost:9222");
});
