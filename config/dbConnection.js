const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            ssl: true,
            tlsAllowInvalidCertificates: false
        });
        console.log("Db Connection Established");
    }
    catch (err) {
        console.error(err);
    }
}



module.exports = dbConnection;