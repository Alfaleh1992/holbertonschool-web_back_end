import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    const DB = process.argv[2];

    try {
      const fields = await readDatabase(DB);

      const out = ['This is the list of our students'];
      // keep field order as created (insertion order), do not sort names
      for (const key of Object.keys(fields)) {
        const list = fields[key];
        out.push(`Number of students in ${key}: ${list.length}. List: ${list.join(', ')}`);
      }

      res.status(200).send(out.join('\n'));
    } catch (_e) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const DB = process.argv[2];

    try {
      const fields = await readDatabase(DB);
      const list = fields[major] || []; // preserve CSV order
      res.status(200).send(`List: ${list.join(', ')}`);
    } catch (_e) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
