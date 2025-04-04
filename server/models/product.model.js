const pool = require('../config/db');

class Product {
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll(limit = 100, offset = 0) {
    try {
      const [rows] = await pool.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async create(productData) {
    try {
      const { name, description, price, stock, image_url, category } = productData;

      const [result] = await pool.query(
        'INSERT INTO products (name, description, price, stock, image_url, category) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, stock, image_url, category]
      );

      return { id: result.insertId, ...productData };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, productData) {
    try {
      const { name, description, price, stock, image_url, category } = productData;
      let query = 'UPDATE products SET ';
      const params = [];

      if (name) {
        query += 'name = ?, ';
        params.push(name);
      }

      if (description !== undefined) {
        query += 'description = ?, ';
        params.push(description);
      }

      if (price) {
        query += 'price = ?, ';
        params.push(price);
      }

      if (stock !== undefined) {
        query += 'stock = ?, ';
        params.push(stock);
      }

      if (image_url) {
        query += 'image_url = ?, ';
        params.push(image_url);
      }

      if (category) {
        query += 'category = ?, ';
        params.push(category);
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
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async search(term) {
    try {
      const searchTerm = `%${term}%`;
      const [rows] = await pool.query(
        'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ?',
        [searchTerm, searchTerm, searchTerm]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async countAll() {
    try {
      const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
