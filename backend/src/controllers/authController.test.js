jest.mock('../models', () => ({
  User: jest.fn(),
}));

const { User } = require('../models');
const { register, login } = require('./authController');

describe('authController', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  test('register returns 201 when a user is created successfully', async () => {
    req.body = { email: 'user@example.com', password: 'secret123' };

    const save = jest.fn().mockResolvedValue();
    User.mockImplementation(() => ({ save }));

    await register(req, res);

    expect(User).toHaveBeenCalledWith({ email: 'user@example.com', password: 'secret123' });
    expect(save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

  test('register returns 500 when save fails', async () => {
    req.body = { email: 'user@example.com', password: 'secret123' };

    const save = jest.fn().mockRejectedValue(new Error('db failure'));
    User.mockImplementation(() => ({ save }));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error registering user' }));
  });

  test('login returns 200 and the user when credentials are valid', async () => {
    req.body = { email: 'user@example.com', password: 'secret123' };

    const user = {
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user });
  });

  test('login returns 401 when credentials are invalid', async () => {
    req.body = { email: 'user@example.com', password: 'wrong-password' };

    const user = {
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  test('login returns 500 when lookup throws an error', async () => {
    req.body = { email: 'user@example.com', password: 'secret123' };
    User.findOne = jest.fn().mockRejectedValue(new Error('db failure'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error logging in' }));
  });
});
