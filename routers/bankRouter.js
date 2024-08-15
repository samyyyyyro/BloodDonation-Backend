const router = require("express").Router();
const auth = require("../middleware/auth");
const BloodBank = require("../models/BloodBank")
const { stateDistricts, bankDonations, updateStock, deleteStock, viewStock, bankRequests,viewBankDonations, viewBankRequests, homeBank } = require("../controllers/banks");

router.post("/:handle", auth, async (req, res) => {
    try {
        const filter = req.params.handle == "bank" ? {} : { password: 0, requests: 0, donations: 0, stock: 0, __v: 0 };
        const banks = await BloodBank.find(req.body, filter);
        res.json(banks);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/allBanks/:state/:district", stateDistricts);

router.put("/updateStock", auth, updateStock);

router.put("/deleteStock", auth, deleteStock);

router.get("/getStock", auth, viewStock);

router.put("/donations", auth, bankDonations);

router.put("/requests", auth, bankRequests);

router.get("/donations", auth, viewBankDonations);

router.get("/requests", auth, viewBankRequests);

router.put("/", auth, homeBank);

module.exports = router;