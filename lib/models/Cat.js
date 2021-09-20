const pool = require('../utils/pool');

module.exports = class Order {
  id;
  age;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.age = row.age;
    this.quantity = row.quantity;
  }
};
