const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@mail.com',
  password: '@Admin04'
};

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

// Check for hardcoded admin login
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

      // Regular user login
      const result = await UserService.login(email, password);

      const token = jwt.sign(
        { userId: result.user.id, email: result.user.email, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const userWithRole = {
        ...result.user,
        role: 'user'
      };

      res.status(200).json({
        success: true,
        message: 'Login successful',
        payload: {
          token,
          user: userWithRole,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;