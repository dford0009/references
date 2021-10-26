import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;

function getMimeType(ext: string): string {
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.json':
      return 'application/json';
    default:
      return '';
  }
}

const server = http.createServer((req, res) => {
  const {url} = req;
  const filePath = url === '/' ? './index.html' : `.${url}`;
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    let code;
    let content;
    let headers;

    if (err) {
      code = err.code === 'ENOENT' ? 404 : 500;
      content = `${code} error. Please try again.`;
      headers = {'Content-Type': getMimeType(ext)};
    } else {
      code = 200;
      content = data;
    }

    res.writeHead(code, headers);
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, () => console.log('SERVER STARTED'));
