import readFile from './readFile';
import writeFile from './writeFile';
import readFileByName from './readFileByName';

type Data = {
  name: string,
  description: string,
  numbers: number[],
};

async function run() {
  const data = await readFile<Data>('./numbers.json');

  console.log('initial numbers: ', data.numbers);

  const mappedData = {
    numbers: data.numbers.map((n: number) => n + 1),
  };

  await writeFile('./numbers.json', mappedData);

  console.log('finished incrementing numbers!');

  const dataByNameNumbers = await readFileByName('Numbers');
  const dataByNameStrings = await readFileByName('Strings');

  console.log('numbers: ', dataByNameNumbers.numbers);
  console.log('strings: ', dataByNameStrings.strings);
}

run();
