const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://localhost:27017/crud", options)
    .then((res) => console.log("Connected to MondoDB.."))
    .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
})

const UserModel = mongoose.model("users", UserSchema)

app.get("/getusers", (req, res) => {
    UserModel.find({}).then(function (users) {
        res.json(users)
    }).catch(function (err) {
        console.log(err)
    })

})


app.listen(3001, () => {
    console.log("server is running ");
})
