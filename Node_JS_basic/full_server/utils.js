import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = data.trim().split('\n').slice(1);
    const fields = {};

    lines.forEach((row) => {
      const parts = row.split(',');
      if (parts.length >= 4) {
        const firstName = parts[0].trim();
        const field = parts[3].trim();
        if (firstName && field) {
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstName);
        }
      }
    });

    resolve(fields);
  });
});

export default readDatabase;
export { readDatabase };
