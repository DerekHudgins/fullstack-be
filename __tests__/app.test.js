import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat';

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

  it('gets a cat by id', async () => {
    const tom = await Cat.insert({
      name: 'tom',
      age: 10,
      quantity: 1,
    });

    const res = await request(app).get(`/api/v1/cats/${tom.id}`);

    expect(res.body).toEqual(tom);
  });

  it('gets all cats from get', async () => {
    const tom = await Cat.insert({
      name: 'tom',
      age: 10,
      quantity: '1',
    });
    const garfield = await Cat.insert({
      name: 'garfield',
      age: 15,
      quantity: '2',
    });
    const sassy = await Cat.insert({
      name: 'sassy',
      age: 8,
      quantity: '1',
    });

    return request(app)
      .get('/api/v1/cats')
      .then((res) => {
        expect(res.body).toEqual([tom, garfield, sassy]);
      });
  });

  it('updates a cat by id', async () => {
    const tom = await Cat.insert({
      name: 'tom',
      age: 10,
      quantity: '2',
    });

    const res = await request(app)
      .put(`/api/v1/cats/${tom.id}`)
      .send({ quantity: 1 });

    expect(res.body).toEqual({ ...tom, quantity: 1 });
  });
});
