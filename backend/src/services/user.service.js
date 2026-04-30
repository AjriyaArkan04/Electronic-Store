const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { AppError } = require('../middleware/errorHandler');

class UserService {

  static async register({ name, username, email, phone, password }) {
    const existingUserByEmail = await User.findByEmail(email);

    if (existingUserByEmail) {
      throw new AppError('User with this email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    return user;
  }

  static async login(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance
      }
    };
  }

  static async updateProfile(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.update(id, updateData);

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    return updatedUser;
  }

  static async getTransactionHistory(userId) {
    return await User.getTransactionHistory(userId);
  }

  static async getTotalSpent(userId) {
    return await User.getTotalSpent(userId);
  }
}

module.exports = UserService;