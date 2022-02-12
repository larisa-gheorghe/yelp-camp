const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '611955aecfbf1200167ad451',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus quos esse illo, facere incidunt beatae blanditiis quas culpa repudiandae! Doloribus, libero deserunt distinctio ducimus et a unde fugiat atque non!',
            price,
            geometry: {
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqo3oexqo/image/upload/v1628686046/YelpCamp/y6w83utlpddettqgokaz.jpg',
                    filename: 'YelpCamp/y6w83utlpddettqgokaz' },
                {
                    url: 'https://res.cloudinary.com/dqo3oexqo/image/upload/v1628682253/YelpCamp/x81vbjch96rvffn5az2a.jpg',
                    filename: 'YelpCamp/x81vbjch96rvffn5az2a' },
                {
                    url: 'https://res.cloudinary.com/dqo3oexqo/image/upload/v1628682253/YelpCamp/szhgjw9yjtzarxp9u5b3.jpg',
                    filename: 'YelpCamp/szhgjw9yjtzarxp9u5b3' 
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});