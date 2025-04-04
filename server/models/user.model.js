const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async findByUsername(username) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT id, username, email, role, created_at, updated_at FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { username, email, password, role = 'user' } = userData;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role]
      );

      return { id: result.insertId, username, email, role };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, userData) {
    try {
      const { username, email, password, role } = userData;
      let query = 'UPDATE users SET ';
      const params = [];

      if (username) {
        query += 'username = ?, ';
        params.push(username);
      }

      if (email) {
        query += 'email = ?, ';
        params.push(email);
      }

      if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        query += 'password = ?, ';
        params.push(hashedPassword);
      }

      if (role) {
        query += 'role = ?, ';
        params.push(role);
      }

      // Remove trailing comma and space
      query = query.slice(0, -2);

      query += ' WHERE id = ?';
      params.push(id);

      const [result] = await pool.query(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
