const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const numOfResults = process.argv[3];
const values = [cohort, numOfResults];
const queryString = `
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '$1%'
LIMIT $2;
`;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort.`);
    });
  })
  .catch(err => console.error('query error', err.stack));
