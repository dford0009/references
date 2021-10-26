const http = require('http');

const port = 3000;

function respondQuotes(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  const randomQuoteIndex = Math.floor((Math.random() * 4) + 1);
  const randomQuote = quotesArray[randomQuoteIndex];
  res.end(randomQuote);
}

const server = http.createServer((req, res) => {
  if (req.url === '/quotes') return respondQuotes(req, res);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Howdy rockstar');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// These are a list of quotes from the show The Office.
const quotesArray = [
  'I feel God in this Chilis tonight',
  'If You Pray Enough, You Can Turn Yourself Into A Cat Person.',
  'How would I describe myself? Three words. Hard-working. Alpha male. Jackhammer. Merciless. Insatiable.',
  'Sometimes The Clothes At Gap Kids Are Too Flashy, So I am Forced To Go To The American Girl Store And Order Clothes For Large Colonial Dolls.',
  'Every Little Boy Fantasizes About His Fairy-Tale Wedding.',
];
