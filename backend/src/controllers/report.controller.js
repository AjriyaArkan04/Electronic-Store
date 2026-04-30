const db = require('../config/database');

class ReportController {
  // TODO: Implementasi endpoint laporan dengan query SQL kompleks
  static async getTopUsers(req, res, next) {
    try {
      // GET /reports/top-users?limit=10
      // Query: ranking pengguna berdasarkan total pengeluaran (gunakan window function RANK())
      const limit = parseInt(req.query.limit) || 10;

      const result = await db.query(
        `SELECT u.id, u.name, u.email,
                SUM(t.total) AS total_spent,
                RANK() OVER (ORDER BY SUM(t.total) DESC) AS rank
         FROM users u
         JOIN transactions t ON u.id = t.user_id
         WHERE t.status = 'paid'
         GROUP BY u.id
         ORDER BY total_spent DESC
         LIMIT $1`,
        [limit]
      );

      res.status(200).json({
        success: true,
        message: 'Top users retrieved successfully',
        payload: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemsSold(req, res, next) {
    try {
      // GET /reports/items-sold
      // Query: total quantity terjual dan total pendapatan per item (gunakan JOIN dan SUM)
      const result = await db.query(
        `SELECT i.id, i.name,
                SUM(t.quantity) AS total_quantity,
                SUM(t.total) AS total_revenue
         FROM items i
         JOIN transactions t ON i.id = t.item_id
         WHERE t.status = 'paid'
         GROUP BY i.id
         ORDER BY total_quantity DESC`
      );

      res.status(200).json({
        success: true,
        message: 'Items sold retrieved successfully',
        payload: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMonthlySales(req, res, next) {
    try {
      // GET /reports/monthly-sales?year=2026
      // Query: ringkasan penjualan bulanan (gunakan date_trunc dan GROUP BY)
      const year = parseInt(req.query.year);

      const result = await db.query(
        `SELECT DATE_TRUNC('month', t.created_at) AS month,
                SUM(t.total) AS total_sales
         FROM transactions t
         WHERE t.status = 'paid'
           AND EXTRACT(YEAR FROM t.created_at) = $1
         GROUP BY month
         ORDER BY month`,
        [year]
      );

      res.status(200).json({
        success: true,
        message: 'Monthly sales retrieved successfully',
        payload: result.rows,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;