const { Model } = require('objection');

class BaseModel extends Model {
  $beforeInsert() {
    const now = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate() {
    const now = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    this.updatedAt = now;
  }
}

module.exports = BaseModel;
