const User = require("../models/User")
const Requests = require("../models/Requests")
const Donations = require("../models/Donations")
const BloodBank = require("../models/BloodBank")
const Camp = require("../models/Camp")

exports.stateDistricts = async (req, res) => {
    try {
        const banks = await BloodBank.find({ state: req.params.state, district: req.params.district }, { password: 0, _id: 0, donations: 0, requests: 0, stock: 0 });
        res.json(banks);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.updateStock = async (req, res) => {
    try {
        const prevStock = await BloodBank.findOne({ _id: req.user }, { stock: 1 });
        await BloodBank.updateOne(
            { _id: req.user },
            { $set: { ["stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] + req.body.units } }
        )
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.deleteStock = async (req, res) => {
    try {
        const prevStock = await BloodBank.findOne({ _id: req.user }, { stock: 1 });
        if (prevStock.stock[req.body.bloodGroup] < req.body.units) {
            res.status(404).send("Not enough blood");
        } else {
            await BloodBank.updateOne(
                { _id: req.user },
                { $set: { ["stock." + req.body.bloodGroup]: prevStock.stock[req.body.bloodGroup] - req.body.units } }
            )
            res.status(200).send();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.viewStock = async (req, res) => {
    try {
        const data = await BloodBank.findOne(
            { _id: req.user },
            { _id: 0, stock: 1 }
        )
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.bankDonations = async (req, res) => {
    try {
        Donations.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, user) => {
            if (err) {
                res.status(404).send("Donation not found");
            } else {
                res.status(200).send("Status updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.bankRequests = async (req, res) => {
    try {
        Requests.updateOne({ _id: req.body.id }, { status: req.body.status }, (err, user) => {
            if (err) {
                res.status(404).send("Request not found");
            } else {
                res.status(200).send("Status updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

exports.viewBankDonations = async (req, res) => {
    try {
        const data = await Donations.find({ bankId: req.user }).populate('userId', '-__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


exports.viewBankRequests = async (req, res) => {
    try {
        const data = await Requests.find({ bankId: req.user }).populate('userId', '-__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


exports.homeBank = async (req, res) => {
    try {
        console.log(req.user);
        BloodBank.updateOne({ _id: req.user }, req.body, (err, user) => {
            if (err) {
                res.status(404).send("BloodBank not found");
            } else {
                res.status(200).send("BloodBank updated");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}





