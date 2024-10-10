const mongoose = require('mongoose');


const URL = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_CLUSTER_NAME + ".q2akd.mongodb.net/MERN-API";
;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Successfully Connected With Database");
    } catch (error) {
        console.log("Database Connection Failed");
        process.exit(0);
    }
};

module.exports = connectDB;
