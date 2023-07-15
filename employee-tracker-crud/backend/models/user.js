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
        'INSERT INTO users (first_name, last_name, age, years_of_employment, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, age, years_of_employment, role]
      )
      .then((result) => result.rows[0]);
  }

  static updateUser(userId, userData) {
    const { first_name, last_name, age, years_of_employment, role } = userData;

    return client
      .query(
        'UPDATE users SET first_name = $1, last_name = $2, age = $3, years_of_employment = $4, role = $5 WHERE id = $6 RETURNING *',
        [first_name, last_name, age, years_of_employment, role, userId]
      )
      .then((result) => result.rows[0]);
  }

  static deleteUser(userId) {
    return client
      .query('DELETE FROM users WHERE id = $1', [userId])
      .then(() => {
        console.log(`User with id ${userId} deleted`);
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
        throw err; // Propagate the error to be handled in the route handler
      });
  }
}

module.exports = User;
