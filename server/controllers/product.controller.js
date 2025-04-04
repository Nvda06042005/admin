const Product = require('../models/product.model');

// Get all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const products = await Product.findAll(limit, offset);
    const totalCount = await Product.countAll();

    res.status(200).json({
      products,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image_url, category } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    // Create product
    const productData = { name, description, price, stock, image_url, category };
    const newProduct = await Product.create(productData);

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product
    const updated = await Product.update(productId, updateData);

    if (!updated) {
      return res.status(400).json({ message: 'Failed to update product' });
    }

    // Get updated product data
    const updatedProduct = await Product.findById(productId);

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete product
    const deleted = await Product.delete(productId);

    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete product' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const products = await Product.search(searchTerm);
    res.status(200).json({ products });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
