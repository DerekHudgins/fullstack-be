import pool from '../utils/pool';

export default class Cat {
  id;
  age;
  name;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.age = row.age;
    this.name = row.name;
    this.quantity = row.quantity;
  }
  static async insert({ name, age, quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, age, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, age, quantity]
    );

    return new Cat(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);

    return new Cat(rows[0]);
  }
}
