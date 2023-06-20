// Import models
const Users = require('./Users');
const Search = require('./Search')
const Offer = require('./Offer')

Users.hasMany(Offer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Search, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Offer.belongsTo(Users, {
    foreignKey: 'user_id'
});

Search.belongsTo(Users, {
    foreignKey: 'user_id'
});


module.exports = { Users, Search, Offer };
