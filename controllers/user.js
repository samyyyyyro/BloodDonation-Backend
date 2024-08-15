const User = require("../models/User")
const Requests = require("../models/Requests")
const Donations = require("../models/Donations")
const BloodBank = require("../models/BloodBank")
const Camp = require("../models/Camp")

exports.homeUser = async (req, res) => {
    try {
        console.log("hum yha hain")
        const user = await User.find({ _id: req.user });
        console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.userDonate = async (req, res) => {
    try {
        req.body.userId = req.user;
        const date = new Date();
        req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();
        const newDonation = new Donations(req.body);
        const saved = await newDonation.save();
        await BloodBank.update(
            { _id: req.body.bankId },
            { $push: { donations: { _id: saved._id } } }
        );
        res.send("done")
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.userRequest = async (req, res) => {
    try {
        req.body.userId = req.user;
        const date = new Date();
        req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();
        const newRequest = new Requests(req.body);
        const saved = await newRequest.save();
        await BloodBank.update(
            { _id: req.body.bankId },
            { $push: { requests: { _id: saved._id } } }
        );
        res.send("done")
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.viewDonations = async (req, res) => {
    try {
        const data = await Donations.find({ userId: req.user }).populate('bankId', '-_id -__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.viewRequests = async (req, res) => {
    try {
        const data = await Requests.find({ userId: req.user }).populate('bankId', '-_id -__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.home = async (req, res) => {
    try {
        console.log(req.user);
        User.updateOne({ _id: req.user }, req.body, (err, user) => {
            if (err) {
                res.send(404, "User not found");
            } else {
                res.send(200, "User updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


