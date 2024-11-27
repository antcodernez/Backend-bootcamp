// Server
const http = require('http');
const url = require('url');

// Tabla de rutas (lookup table)
const pathName = {
  '/overview': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Page about overview');
  },
  '/juan': (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Im Juan');
  },
  '/': (res) => {
    res.writeHead(200, { 
        'Content-Type': 'text/html',
        'my-own-header-writed-for-me': 'Hello baby, can you see me ñ.ñr?'
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
server.listen(9222, '127.0.0.1', () => {
  console.log("I'm alive bitch!! xd");
});
