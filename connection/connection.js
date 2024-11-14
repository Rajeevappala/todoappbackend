const mongoose = require('mongoose');

const connect = async(request , response) => {
    try {
        await mongoose.connect('mongodb+srv://rajeevappala055:rajeevappala055@cluster0.vkqej.mongodb.net/')
        .then(() => {
            console.log("connected to database");
        }) 
    } catch (error) {
        console.error(error)
    }
    
}
connect()