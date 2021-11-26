const mongoose = require('mongoose');

const dbConnection = async () => {



    await mongoose.connect(process.env.mondoDB_Atlas, { useNewUrlParser: true }, (err, res) => {

        if (err) throw err;

    });

}

module.exports = {
    dbConnection
}