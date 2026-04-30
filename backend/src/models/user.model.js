const db = require('../config/database');

class User {

  static async create({ name, username, email, phone, password }) {
    const result = await db.query(
      `INSERT INTO users (name, username, email, phone, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, username, email, phone, balance, created_at`,
      [name, username, email, phone, password]
    );

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      `SELECT id, name, username, email, phone, balance, created_at
       FROM users WHERE id = $1`,
      [id]
    );

    return result.rows[0];
  }

}

module.exports = User;