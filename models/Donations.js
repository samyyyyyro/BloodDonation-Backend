const mongoose = require("mongoose");

// ------- Donations Model -------

// Create schema for Donations
const bloodDonations = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    bankId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'BloodBank', 
      required: true 
    },
    units: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: String, 
      required: true 
    },
    disease: { 
      type: String 
    },
    status: { type: String, required: true, 
              enum: ['Pending', 'Approved', 'Denied', 'Donated'], 
              default: 'Pending' 
            },
});

// Create model for Donors
module.exports = mongoose.model('Donations', bloodDonations);
