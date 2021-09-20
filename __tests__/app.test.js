import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('cat order routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat from post', async () => {
    const garfield = { name: 'garfield', age: 15, quantity: 2 };
    const res = await request(app).post('/api/v1/cats').send(garfield);

    expect(res.body).toEqual({
      id: '1',
      ...garfield,
    });
  });
});
