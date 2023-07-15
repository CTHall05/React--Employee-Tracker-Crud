const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

class User {
  static getAllUsers() {
    return client.query('SELECT * FROM users').then((result) => result.rows);
  }

  static createUser(userData) {
    const { first_name, last_name, age, years_of_employment, role } = userData;

    return client
      .query(
        'INSERT INTRO users (first_name, last_name, age, years_of_employment, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, age, years_of_employment, role]
      )
      .then((result) => result.rows[0]);
  }
}
