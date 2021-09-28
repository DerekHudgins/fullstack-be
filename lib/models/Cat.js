import pool from '../utils/pool';
export default class Cat {
  id;
  age;
  name;
  quantity;
  gif;

  constructor(row) {
    this.id = row.id;
    this.age = row.age;
    this.name = row.name;
    this.quantity = row.quantity;
    this.gif = row.gif;
  }
  static async insert({ name, age, quantity, gif }) {
    const { rows } = await pool.query(
      'INSERT INTO cats (name, age, quantity, gif) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, quantity, gif]
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
  static async updateById(id, { name, age, quantity, gif }) {
    const existingCat = await Cat.getById(id);
    const newName = name ?? existingCat.name;
    const newAge = age ?? existingCat.age;
    const newQuantity = quantity ?? existingCat.quantity;
    const newGif = gif ?? existingCat.gif;

    const { rows } = await pool.query(
      'UPDATE cats SET name=$1, age=$2, quantity=$3, gif=$4 WHERE id=$5 RETURNING *',
      [newName, newAge, newQuantity, newGif, id]
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
