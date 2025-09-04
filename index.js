const express = require('express')
const app = express()

const { default: mongoose, get, mongo } = require('mongoose');
const { initializeDatabase } = require('./db/db.connect')
const Restaurant = require('./models/restaurant.models')

app.use(express.json())

initializeDatabase()

async function createRestaurant(newRestaurant) {
    try {
        const restaurant = new Restaurant(newRestaurant)
        const saveRestaurant = await restaurant.save()
        // console.log("New Restaurant data: ", saveRestaurant)
        return saveRestaurant
    } catch (error) {
        throw error
    }
}

app.post("/restaurants", async (req, res) => {
    try {
                const savedRestaurant = await createRestaurant(req.body)
        res.status(201).json({ message: "Restaurant added successfully.", restaurant: savedRestaurant })
    } catch (error) {
        res.status(500).json({ error: "Failed to add Restaurant." })
    }
})

// // Question 1 & 2

// async function seedRestaurant() {
//     await createRestaurant(somiRestaurant);
//     await createRestaurant(yoChinaRestaurant);
//     mongoose.connection.close()
// }

// // seedRestaurant()

// Question 3:

async function readAllRestaurant() {
    try {
        const allRes = await Restaurant.find()
        // console.log("All Restaurants Details: ", allRes)
        return allRes
    } catch (error) {
        console.log(error)
    }
}

app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await readAllRestaurant()
        if (restaurants.length !== 0) {
            res.json(restaurants)
        } else {
            res.status(404).json({ error: "No Restaurants found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurants." })
    }
})


// readAllRestaurant()

// Question 4:

async function getRestaurantByName(restaurantName) {
    try {
        const restaurant = await Restaurant.findOne({ name: restaurantName })
        if (restaurant) {
            // console.log("Restaurant Details: ", restaurant)
            // mongoose.connection.close()
            return restaurant
        } else {
            console.log(`No restaurant found with the name "${restaurantName}"`)
            // mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
    }
}

app.get("/restaurants/:restaurantName", async (req, res) => {
    try {
        const restaurant = await getRestaurantByName(req.params.restaurantName)
        if (restaurant.length !== 0) {
            res.json(restaurant)
        } else {
            res.status(404).json({ error: "Restaurant not found by name." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurants by name." })
    }
})

// getRestaurantByName("New Restaurant")

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

// getAllRestaurantsWithReservations()

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

// getAllRestaurantsWithDelivery()

// Question 7: 

async function getRestaurantByPhoneNumber(phoneNumber) {
    try {
        const restaurantPhoneNumber = await Restaurant.findOne({ phoneNumber: phoneNumber })
        if (restaurantPhoneNumber) {
            // console.log(`Restaurant details of phone number "${phoneNumber}": `, restaurantPhoneNumber)
            // mongoose.connection.close()
            return restaurantPhoneNumber
        }
        else {
            console.log(`No Restaurant found with the "${phoneNumber}".`)
            // mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
        // mongoose.connection.close()
    }
}

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
    try {
        const restaurant = await getRestaurantByPhoneNumber(req.params.phoneNumber)
        if (restaurant.length !== 0) {
            res.json(restaurant)
        } else {
            res.status(404).json({ error: "Restaurant not found by phone number." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurants by phone number." })
    }
})

// getRestaurantByPhoneNumber("+1288997392")

// Question 8: 

async function getRestaurantByCuisine(cuisineName) {
    try {
        const cuisineRestaurant = await Restaurant.find({ cuisine: cuisineName })
        if (cuisineRestaurant) {
            // console.log(`Restaurants details with "${cuisineName}" cuisine: `, cuisineRestaurant)
            // mongoose.connection.close()
            return cuisineRestaurant
        } else {
            console.log(`No Restaurant found with "${cuisineName}" cuisine.`)
            // mongoose.connection.close()
        }
    } catch (error) {
        console.log(error)
        // mongoose.connection.close()
    }
}

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
    try {
        const restaurants = await getRestaurantByCuisine(req.params.cuisineName)
        if (restaurants.length !== 0) {
            res.json(restaurants)
        } else {
            res.status(404).json({ error: "Restaurant not found by cuisine." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurants by cuisine." })
    }
})

// getRestaurantByCuisine("Italian")

async function getRestaurantByLocation(resLocation) {
    try {
        const restaurant = await Restaurant.find({ location: resLocation })
        if (restaurant) {
            return restaurant
        }
    } catch (error) {
        console.log("Error in getting location restaurant.")
    }
}

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
    try {
        const restaurant = await getRestaurantByLocation(req.params.restaurantLocation)
        if (restaurant.length !== 0) {
            res.json(restaurant)
        } else {
            res.status(404).json({ error: "Restaurant not found by location." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch restaurant by location" })
    }
})

// BE2.3_HW1 

// Question 1: 

async function updateRestaurantById(restaurantId, dataToUpdate) {
    try {
        const updatedRating = await Restaurant.findByIdAndUpdate(restaurantId, dataToUpdate, { new: true })
        // console.log(updatedRating)
        return updatedRating
    } catch (error) {
        console.log("Error in updating rating.", error)
    }
}

app.post("/restaurants/:restaurantId", async(req, res) => {
    try{
        const updRestaurant = await updateRestaurantById(req.params.restaurantId, req.body)
        if(updRestaurant){
            res.status(200).json({message: "Restaurant updated successfully", updRestaurant: updRestaurant})
        }else{
            res.status(404).json({error: "Restaurant not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update restaurant by id"})
    }
})

// updateRestaurantById("68ab22ba6eadcea50d5c444c", {rating: 4.1})

// Question 2: 

async function updateRestaurantByName(restaurantName, dataToUpdate) {
    try {
        const updatedName = await Restaurant.findOneAndUpdate({ name: restaurantName }, dataToUpdate, { new: true })
        console.log(updatedName)
    } catch (error) {
        console.log("Error in changing data.", error)
    }
}

// updateRestaurantByName("Somi", {name: "Som Sarovar"})

// Question 3: 

async function updateRestaurantByPhoneNumber(resPhoneNumber, dataToUpdate) {
    try {
        const updatedPhoneNumber = await Restaurant.findOneAndUpdate({ phoneNumber: resPhoneNumber }, dataToUpdate, { new: true })
        console.log(updatedPhoneNumber)
    } catch (error) {
        console.log("Error in changing phone number.")
    }
}

// updateRestaurantByPhoneNumber("+1288997392", {isDeliveryAvailable: true})

// BE2.4_HW1

// Question 1: 

async function deleteRestaurantById(restaurantId) {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId)
        // console.log("Deleted Restaurant by ID: ", deletedRestaurant)
        return deletedRestaurant
    } catch (error) {
        console.log("Error in Deleting Restaurant by ID.", error)
    }
}

app.delete("/restaurants/:restaurantId", async(req, res) => {
    try{
        const delRestaurant = await deleteRestaurantById(req.params.restaurantId)
        if(delRestaurant){
            res.status(200).json({message: "Restaurant deleted successfully."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete restaurant."})
    }
})

// deleteRestaurantById("68a7804f974699d31fe1c90e")

async function deleteRestaurantByName(resName) {
    try {
        const deletedRestaurant = await Restaurant.findOneAndDelete({ name: resName })
        console.log("Deleted Restaurant by Name: ", deletedRestaurant)
    } catch (error) {
        console.log("Error in Deleting Restaurant by Name.", error)
    }
}

// deleteRestaurantByName("Yo China")

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})