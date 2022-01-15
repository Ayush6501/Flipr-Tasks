const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apiSchema = new Schema({}, { strict: false})
const ApiData = mongoose.model('apiData', apiSchema, 'devices')

module.exports = { ApiData };
