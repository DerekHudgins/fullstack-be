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
}
