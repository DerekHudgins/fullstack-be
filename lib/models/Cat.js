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
  static async getAll() {
    const { rows } = await pool.query('SELECT * from cats');

    return rows.map((row) => new Cat(row));
  }
  static async updateById(id, { name, age, quantity }) {
    const existingCat = await Cat.getById(id);
    const newName = name ?? existingCat.name;
    const newAge = age ?? existingCat.age;
    const newQuantity = quantity ?? existingCat.quantity;

    const { rows } = await pool.query(
      'UPDATE cats SET name=$1, age=$2, quantity=$3 WHERE id=$4 RETURNING *',
      [newName, newAge, newQuantity, id]
    );

    return new Cat(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id=$1 RETURNING *',
      [id]
    );

    return new Cat(rows[0]);
  }
}
