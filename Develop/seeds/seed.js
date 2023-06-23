const sequelize = require('../config/connection');
const { Users, Search, Offer, Review } = require('../model');

const userData = require('./userData.json');
const offerData = require('./offerData.json');
const searchData = require('./searchData.json');
const reviewData = require('./reviews.json');

//Function to seed db
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await Users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const offers = await Offer.bulkCreate(offerData, {
        individualHooks: true,
        returning: true,
    });

    const search = await Search.bulkCreate(searchData, {
        individualHooks: true,
        returning: true,
    });

    const reviews = await Review.bulkCreate(reviewData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

seedDatabase();