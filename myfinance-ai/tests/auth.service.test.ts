import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../src/models/User';
import { loginService, signupService } from '../src/services/auth.service';


jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signupService', () => {
    it('should throw error if user already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@test.com' });

      await expect(signupService('test@test.com', 'password', 'tester')).rejects.toThrow('이미 등록된 이메일입니다.');
    });

    it('should create user if email not exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.prototype.save as jest.Mock).mockResolvedValue(true);

      const user = await signupService('test@test.com', 'password', 'tester');
      expect(user.email).toBe('test@test.com');
      expect(user.password).toBe('hashedPassword');
      expect(user.name).toBe('tester');
    });
  });

  describe('loginService', () => {
    it('should throw error if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(loginService('notfound@test.com', 'password')).rejects.toThrow('사용자를 찾을 수 없습니다.');
    });

    it('should throw error if password does not match', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed', email: 'test@test.com', name: 'tester', _id: mongoose.Types.ObjectId() });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(loginService('test@test.com', 'wrongpassword')).rejects.toThrow('비밀번호가 일치하지 않습니다.');
    });

    it('should return tokens and user info if login success', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ _id: new mongoose.Types.ObjectId(), email: 'test@test.com', name: 'tester', password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await loginService('test@test.com', 'correctpassword');
      expect(result.accessToken).toBe('token');
      expect(result.refreshToken).toBe('token');
      expect(result.user.email).toBe('test@test.com');
    });
  });
});
