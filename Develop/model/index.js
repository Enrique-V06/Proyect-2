// Import models
const Users = require('./Users');
const Search = require('./Search');
const Offer = require('./Offer');
const Review = require('./Review');

Users.hasMany(Offer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Search, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Users.hasOne(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Offer.belongsTo(Users, {
    foreignKey: 'user_id'
});

Search.belongsTo(Users, {
    foreignKey: 'user_id'
});

Review.belongsTo(Users, {
    foreignKey: 'user_id'
});


module.exports = { Users, Search, Offer, Review };
