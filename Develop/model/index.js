// Import models
const Users = require('./users');
const Search = require('./Search');
const Offer = require('./Offer');
const Review = require('./Review');

Users.hasMany(Offer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Offer.hasOne(Users, {
    foreignKey: 'user_id'
});

//User can make different searches everytime he enters in userhomepage
Users.hasMany(Search, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Search.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasOne(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Users, {
    foreignKey: 'user_id'
});


module.exports = { Users, Search, Offer, Review };
