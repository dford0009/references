const http = require('http');

const port = 3000;

// function respondQuotes(req, res) {
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Show me some quotes!');
// }

const server = http.createServer((req, res) => {
  // if (req.url === '/quotes') return respondQuotes(req, res);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Howdy rockstar');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
