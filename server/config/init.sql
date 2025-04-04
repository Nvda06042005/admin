-- Create database if not exists
CREATE DATABASE IF NOT EXISTS admin_db;
USE admin_db;

-- Drop tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table (example data for CRUD operations)
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', '$2b$10$rIC1dGRgDhcQGX5eSLBfGOB5ROm9Js9MmfG0JtDYFQzHncjt1EUl.', 'admin');

-- Insert sample products
INSERT INTO products (name, description, price, stock, category) VALUES
('Laptop', 'High performance laptop with 16GB RAM', 1200.00, 10, 'Electronics'),
('Smartphone', 'Latest model with 5G capability', 800.00, 15, 'Electronics'),
('Desk Chair', 'Ergonomic office chair', 150.00, 8, 'Furniture'),
('Coffee Maker', 'Automatic coffee machine', 75.00, 12, 'Appliances'),
('Headphones', 'Noise cancelling wireless headphones', 120.00, 20, 'Electronics');
