import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signup, signin, google, signout } from '../controllers/auth.controller.js';

// Mock dependencies so tests run without MongoDB / real crypto.
vi.mock('bcryptjs', () => ({
  default: {
    hashSync: vi.fn((pw) => `hashed:${pw}`),
    compareSync: vi.fn((pw, hash) => hash === `hashed:${pw}`),
  },
  hashSync: vi.fn((pw) => `hashed:${pw}`),
  compareSync: vi.fn((pw, hash) => hash === `hashed:${pw}`),
}));

vi.mock('jsonwebtoken', () => ({
  default: { sign: vi.fn(() => 'fake-token'), verify: vi.fn() },
  sign: vi.fn(() => 'fake-token'),
  verify: vi.fn(),
}));

vi.mock('../models/User.model.js', () => {
  const save = vi.fn().mockResolvedValue({ _id: 'u1', username: 'test', email: 't@e.com' });
  const User = function (data = {}) {
    return { ...data, _doc: { ...data }, save };
  };
  User.findOne = vi.fn();
  User.findById = vi.fn();
  User.__save = save;
  return { default: User };
});

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const jsonRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
  cookie: vi.fn().mockReturnThis(),
  clearCookie: vi.fn().mockReturnThis(),
  send: vi.fn(),
});

describe('auth.controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('signup hashes password, saves user, returns 201', async () => {
    const req = { body: { username: 'test', email: 't@e.com', password: 'pw' } };
    const res = jsonRes();
    await signup(req, res, vi.fn());
    expect(bcrypt.hashSync).toHaveBeenCalledWith('pw', 10);
    expect(User.__save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  it('signin returns 404 when user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null);
    const req = { body: { email: 'no@e.com', password: 'pw' } };
    const next = vi.fn();
    const res = jsonRes();
    await signin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(404);
  });

  it('signin returns 400 when password is invalid', async () => {
    User.findOne.mockResolvedValueOnce({
      _id: 'u1',
      email: 't@e.com',
      password: 'hashed:other',
      _doc: { _id: 'u1', email: 't@e.com' },
    });
    bcrypt.compareSync.mockReturnValueOnce(false);
    const req = { body: { email: 't@e.com', password: 'pw' } };
    const next = vi.fn();
    const res = jsonRes();
    await signin(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0].statusCode).toBe(400);
  });

  it('signin returns 200 with token and user (no password) on success', async () => {
    User.findOne.mockResolvedValueOnce({
      _id: 'u1',
      email: 't@e.com',
      password: 'hashed:pw',
      _doc: { _id: 'u1', email: 't@e.com' },
    });
    bcrypt.compareSync.mockReturnValueOnce(true);
    const req = { body: { email: 't@e.com', password: 'pw' } };
    const res = jsonRes();
    await signin(req, res, vi.fn());
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'u1' }, 'test-secret');
    expect(res.cookie).toHaveBeenCalledWith('access_token', 'fake-token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: 'u1', email: 't@e.com' });
  });

  it('google signs in an existing user', async () => {
    User.findOne.mockResolvedValueOnce({
      _id: 'u1',
      _doc: { _id: 'u1', email: 'g@e.com' },
    });
    const req = { body: { name: 'G', email: 'g@e.com', photoURL: 'pic' } };
    const res = jsonRes();
    await google(req, res, vi.fn());
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'u1' }, 'test-secret');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: 'u1', email: 'g@e.com' });
  });

  it('google creates a new user when none exists', async () => {
    User.findOne.mockResolvedValueOnce(null);
    const req = { body: { name: 'New', email: 'n@e.com', photoURL: 'pic' } };
    const res = jsonRes();
    await google(req, res, vi.fn());
    expect(User.__save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'n@e.com' })
    );
  });

  it('signout clears the cookie and returns 200', () => {
    const res = jsonRes();
    signout({}, res);
    expect(res.clearCookie).toHaveBeenCalledWith('access_token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Signout Successfully' });
  });
});