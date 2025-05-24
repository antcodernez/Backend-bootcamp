// Server
const http = require('http');
const url = require('url');
const fs = require('fs');

// Lee el archivo JSON correctamente
const data = fs.readFileSync(`${__dirname}/dev-data/fruits.json`, 'utf-8');

const productsObject = JSON.parse(data);

// Tabla de rutas (lookup table)
const pathName = {
  '/overview': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Page about overview');
  },
  '/product': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Im Juan');
  },
  '/api': (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  },
  '/': (res) => {
    res.writeHead(200, { 
        'Content-Type': 'text/html',
        'my-own-header': 'Hello baby, can you see me ñ.ñr?'
     });
    res.end('<h1> Hi main page <h1>');
  },
};

// Crear el servidor
const server = http.createServer((req, res) => {
  const page = pathName[req.url]; // Busca la ruta en el objeto
  
  if (page) {
    page(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

// Iniciar el servidor
server.listen(9222, 'localhost', () => {
  console.log("I'm alive bitch!! xd http://localhost:9222");
});
