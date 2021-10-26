import fs from 'fs';

function readFile<Contents extends object>(fileName: string): Promise<Contents> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      const parsedData = JSON.parse(data);

      if (err) {
        reject(err);
      } else {
        resolve(parsedData);
      }
    })
  });
}

export default readFile;
