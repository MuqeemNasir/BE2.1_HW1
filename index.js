const { default: mongoose, get, mongo } = require('mongoose');
const { initializeDatabase } = require('./db/db.connect')
const Restaurant = require('./models/restaurant.models')

initializeDatabase()

// const newRestaurant = {
//   name: "Cha Cha",
//   cuisine: ["Spanish"],
//   location: "123 Main Street, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://example.com",
//   phoneNumber: "+1234567890",
//   openHours: "Mon-Sun: 11:00 AM - 10:00 PM",
//   priceRange: "$$ (11-30)",
//   reservationsNeeded: true,
//   isDeliveryAvailable: true,
//   menuUrl: "https://example.com/menu",
//   photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
// };

const somiRestaurant = {
    name: "Somi",
    cuisine: ["Greek"],
    location: "11 Main Road, Gem",
    rating: 4.3,
    reviews: [],
    website: "https://somi-example.com",
    phoneNumber: "+1234997390",
    openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
    priceRange: "$$ (11-30)",
    reservationsNeeded: false,
    isDeliveryAvailable: true,
    menuUrl: "https://somi-example.com/menu",
    photos: ["https://example.com/somi-photo1.jpg", "https://example.com/somi-photo2.jpg"],
};

const yoChinaRestaurant = {
    name: "Yo China",
    cuisine: ["Chinese", "Italian"],
    location: "MG Road, Bangalore",
    rating: 3.9,
    reviews: [],
    website: "https://yo-example.com",
    phoneNumber: "+1288997392",
    openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
    priceRange: "$$$ (31-60)",
    reservationsNeeded: true,
    isDeliveryAvailable: false,
    menuUrl: "https://yo-example.com/menu",
    photos: ["https://example.com/yo-photo1.jpg", "https://example.com/yo-photo2.jpg", "https://example.com/yo-photo3.jpg"]
};

async function createRestaurant(newRestaurant) {
    try {
        const restaurant = new Restaurant(newRestaurant)
        const saveRestaurant = await restaurant.save()
        console.log("New Restaurant data: ", saveRestaurant)
    } catch (error) {
        throw error
    }
}

// Question 1 & 2

async function seedRestaurant() {
    await createRestaurant(somiRestaurant);
    await createRestaurant(yoChinaRestaurant);
    mongoose.connection.close()
}

// seedRestaurant()

// Question 3:

async function readAllRestaurant() {
    try {
        const allRes = await Restaurant.find()
        console.log("All Restaurants Details: ", allRes)
        mongoose.connection.close()

    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }
}

readAllRestaurant()

// Question 4:

async function getRestaurantByName(restaurantName) {
    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName })
        if (restaurant) {
            console.log("Restaurant Details: ", restaurant)
            mongoose.connection.close()
        } else {
            console.log(`No restaurant found with the name "${restaurantName}"`)
            mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
    }
}

getRestaurantByName("New Restaurant")

// Question 5: 

async function getAllRestaurantsWithReservations() {
    try {
        const reservationRestaurant = await Restaurant.find({ reservationsNeeded: true })
        if (reservationRestaurant) {
            console.log("Restaurants details which offer Reservations: ", reservationRestaurant)
            mongoose.connection.close()
        } else {
            console.log("No Restaurants offers Reservations.")
            mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }
}

getAllRestaurantsWithReservations()

// Question 6: 

async function getAllRestaurantsWithDelivery() {
    try {
        const deliveryProviderRestaurant = await Restaurant.find({ isDeliveryAvailable: true })
        if (deliveryProviderRestaurant) {
            console.log("Restaurants details which offer Delivery Service: ", deliveryProviderRestaurant)
            mongoose.connection.close()
        } else {
            console.log("No Restaurants found which offer Delivery Service.")
        }
    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }
}

getAllRestaurantsWithDelivery()

// Question 7: 

async function getRestaurantByPhoneNumber(phoneNumber) {
    try {
        const restaurantPhoneNumber = await Restaurant.findOne({ phoneNumber: phoneNumber })
        if (restaurantPhoneNumber) {
            console.log(`Restaurant details of phone number "${phoneNumber}": `, restaurantPhoneNumber)
            mongoose.connection.close()
        }
        else {
            console.log(`No Restaurant found with the "${phoneNumber}".`)
            mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
        mongoose.connection.close()
    }
}

getRestaurantByPhoneNumber("+1288997392")

// Question 8: 

async function getRestaurantByCuisine(cuisineName){
    try{
        const cuisineRestaurant = await Restaurant.find({cuisine: cuisineName})
        if(cuisineRestaurant){
            console.log(`Restaurants details with "${cuisineName}" cuisine: `, cuisineRestaurant)
            mongoose.connection.close()
        }else{
            console.log(`No Restaurant found with "${cuisineName}" cuisine.`)
            mongoose.connection.close()
        }
    }catch(error){
        console.log(error)
        mongoose.connection.close()
    }
}


getRestaurantByCuisine("Italian")