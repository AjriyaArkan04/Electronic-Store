const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@mail.com',
  password: '@Admin04'
};

class AuthController {

  // =========================
  // REGISTER (NEW)
  // =========================
  static async register(req, res, next) {
    try {
      const { name, username, email, password, phone } = req.body;

      // basic validation
      if (!name || !username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
          payload: null
        });
      }

      // call service
      const user = await UserService.register({
        name,
        username,
        email,
        password,
        phone
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        payload: user
      });

    } catch (error) {
      next(error);
    }
  }

  // =========================
  // LOGIN (EXISTING - FIXED)
  // =========================
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Admin login
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser = {
          id: 0,
          name: 'Administrator',
          username: 'Admin',
          email: 'admin@bikun.com',
          phone: '0000000000',
          balance: 0,
          role: 'admin'
        };

        const token = jwt.sign(
          { userId: 0, email: adminUser.email, role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return res.status(200).json({
          success: true,
          message: 'Admin login successful',
          payload: {
            token,
            user: adminUser,
          },
        });
      }

      // User login
      const result = await UserService.login(email, password);

      const token = jwt.sign(
        { userId: result.user.id, email: result.user.email, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        payload: {
          token,
          user: {
            ...result.user,
            role: 'user'
          },
        },
      });

    } catch (error) {
  console.error("REGISTER ERROR REAL:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    detail: error.detail || null,
    stack: error.stack,
  });
}
  }
}

module.exports = AuthController;