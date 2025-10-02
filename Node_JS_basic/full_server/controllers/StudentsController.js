import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    const dbPath = process.argv[2];
    try {
      const fields = await readDatabase(dbPath);
      const lines = ['This is the list of our students'];

      const ordered = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      ordered.forEach((field) => {
        const list = fields[field].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      });

      res.status(200).send(lines.join('\n'));
    } catch (e) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const dbPath = process.argv[2];
    try {
      const fields = await readDatabase(dbPath);
      const list = (fields[major] || []).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      res.status(200).send(`List: ${list.join(', ')}`);
    } catch (e) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
