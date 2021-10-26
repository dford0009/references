import express from 'express';
import path from 'path';
import NumInfo from './types/NumInfo';

const app = express();
const port = 3000;

app.use('/dist', express.static('dist'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/numInfo/:num', (req, res) => {
  console.log('params: ', req.params);
  const num = Number(req.params.num);

  res.json(getNumInfo(num));
});

app.listen(port, () => console.log(`server started at localhost:${port}`));

function getNumInfo(num: number): NumInfo {
  console.log('getting numinfo for: ', num);

  return {
    num,
    numDigits: String(Math.abs(num)).length,
    isEven: num % 2 === 0,
    isPrime: isPrime(num),
  }
}

function isPrime(num: number): boolean {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}
