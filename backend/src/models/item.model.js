const db = require('../config/database');

class Item {
  static async findAll(sort = 'price_desc') {
    // Supported sort options: price_desc, price_asc, name_asc, name_desc, stock_desc, stock_asc
    let orderClause;
    switch (sort) {
      case 'price_asc':
        orderClause = 'ORDER BY price ASC';
        break;
      case 'name_asc':
        orderClause = 'ORDER BY name ASC';
        break;
      case 'name_desc':
        orderClause = 'ORDER BY name DESC';
        break;
      case 'stock_asc':
        orderClause = 'ORDER BY stock ASC';
        break;
      case 'stock_desc':
        orderClause = 'ORDER BY stock DESC';
        break;
      case 'price_desc':
      default:
        orderClause = 'ORDER BY price DESC';
        break;
    }
    const result = await db.query(`SELECT * FROM items ${orderClause}`);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ name, price, stock }) {
    const result = await db.query(
      'INSERT INTO items (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
      [name, price, stock]
    );
    return result.rows[0];
  }

  static async update(id, { name, price, stock }) {
    const result = await db.query(
      'UPDATE items SET name = COALESCE($1, name), price = COALESCE($2, price), stock = COALESCE($3, stock) WHERE id = $4 RETURNING *',
      [name, price, stock, id]
    );
    return result.rows[0];
  }

static async decreaseStock(id, quantity) {
    const result = await db.query(
      'UPDATE items SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock',
      [quantity, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Item;