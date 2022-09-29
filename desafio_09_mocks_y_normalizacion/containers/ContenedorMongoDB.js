const mongoose = require("mongoose");
const { returnPlainObj, renameField, removeField } = require("../utils/objectUtils.js");

class MongoDbContainer {
  constructor(collectionString, schema) {
    this.model = mongoose.model(collectionString, schema);
  }

  async getById(id) {
    const data = await this.model.findOne({ _id: id });
    const plainData = returnPlainObj(data);
    const item = renameField(plainData, "_id", "id");
    return item;
  }

  async getAll() {
    const data = await this.model.find({});
    const plainData = returnPlainObj(data);
    const items = plainData.map((item) => renameField(item, "_id", "id"));
    return items;
  }

  async getByField(field, criteria) {
    const data = await this.model.findOne().where(field).equals(criteria);
    const plainData = returnPlainObj(data);
    const item = renameField(plainData, "_id", "id");
    return item;
  }

  async createNew(itemData) {
    const newItem = await this.model.create(itemData);
  }

  async updateById(id, itemData) {
    await this.model.updateOne({ _id: id }, { $set: { ...itemData } });
  }

  async deleteById(id) {
    await this.model.deleteOne({ _id: id });
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }
}

module.exports = MongoDbContainer