const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: String,
    id: Number,
    phone: String,
    user_id: Number,
    created_at: {type: Date, default: Date.now()},
    address: String,
    address_detail: String,
    gender: String,
    province: String,
    city: String,
    title: String,
    district: String,
    lng: String,
    lat: String,
    house_number: String     //门牌号
});

addressSchema.index({id: 1});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;