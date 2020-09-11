const mongoose = require('mongoose');
const { Schema } = mongoose;

const Booster = new Schema({
    id: Number,
    coll: String,
    name: String,
    boosters: Array,
    cardsInColl: Number
});

module.exports = mongoose.model('Booster', Booster);