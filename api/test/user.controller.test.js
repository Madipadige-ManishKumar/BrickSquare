import { describe, it, expect, vi, beforeEach } from 'vitest';
import { test, updateUser, deleteUser } from '../controllers/user.controller.js';

vi.mock('bcryptjs', () => ({
  default: { hashSync: vi.fn((pw) => `hashed:${pw}`) },
  hashSync: vi.fn((pw) => `hashed:${pw}`),
}));

vi.mock('../models/User.model.js', () => {
  const findByIdAndUpdate = vi.fn();
  const findByIdAndDelete = vi.fn();
  const deleteMany = vi.fn().mockResolvedValue({});
  const User = function () {};
  User.findByIdAndUpdate = findByIdAndUpdate;
  User.findByIdAndDelete = findByIdAndDelete;
  User.deleteMany = deleteMany;
  return { default: User };
});

vi.mock('../models/listing.model.js', () => {
  const deleteMany = vi.fn().mockResolvedValue({});
  const Listing = function () {};
  Listing.deleteMany = deleteMany;
  return { default: Listing };
});

import User from '../models/User.model.js';
import Listing from '../models/listing.model.js';

const jsonRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
  cookie: vi.fn().mockReturnThis(),
  clearCookie: vi.fn().mockReturnThis(),
  send: vi.fn(),
});

describe('user.controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('test sends a simple message', () => {
    const res = jsonRes();
    test({}, res);
    expect(res.send).toHaveBeenCalledWith('User route testing successful');
  });

  it('updateUser returns 403 when user cannot update another account', async () => {
    const req = { params: { id: 'other' }, user: { id: 'me' }, body: {} };
    const next = vi.fn();
    await updateUser(req, jsonRes(), next);
    expect(next.mock.calls[0][0].statusCode).toBe(403);
  });

  it('updateUser hashes password and updates the user', async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce({
      _doc: { _id: 'me', username: 'new', email: 'n@e.com' },
    });
    const req = { params: { id: 'me' }, user: { id: 'me' }, body: { password: 'pw' } };
    const res = jsonRes();
    await updateUser(req, res, vi.fn());
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'me',
      expect.objectContaining({ password: 'hashed:pw' }),
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ _id: 'me', username: 'new', email: 'n@e.com' });
  });

  it('deleteUser returns 403 when user tries to delete another account', async () => {
    const req = { params: { id: 'other' }, user: { id: 'me' } };
    const next = vi.fn();
    await deleteUser(req, jsonRes(), next);
    expect(next.mock.calls[0][0].statusCode).toBe(403);
  });

  it('deleteUser deletes user and listings, clears cookie', async () => {
    const req = { params: { id: 'me' }, user: { id: 'me' } };
    const res = jsonRes();
    await deleteUser(req, res, vi.fn());
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('me');
    expect(Listing.deleteMany).toHaveBeenCalledWith({ userRef: 'me' });
    expect(res.clearCookie).toHaveBeenCalledWith('access_token');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User deleted successfully',
    });
  });
});