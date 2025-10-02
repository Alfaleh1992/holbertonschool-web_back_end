import fs from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.toString().split('\n').filter((l) => l.trim() !== '');
      // skip header
      const rows = lines.slice(1);

      const fields = {};
      for (let i = 0; i < rows.length; i += 1) {
        const cols = rows[i].split(',');
        if (cols.length >= 4) {
          const firstName = cols[0].trim();
          const field = cols[3].trim();
          if (!fields[field]) fields[field] = [];
          // preserve CSV order; no sorting
          fields[field].push(firstName);
        }
      }

      resolve(fields);
    });
  });
}

export default readDatabase;
