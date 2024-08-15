const mongoose = require("mongoose");

// ------- Blood Bank Model -------
const stock = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 };

// Create schema for Blood Banks
const bloodBankSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    hospital: { 
        type: String, 
        required: true 
    },
    contactPerson: { 
        type: String 
    },
    category: { 
        type: String, 
        required: true 
    },    
    website: { 
        type: String 
    },
    
    phone: { 
        type: Number, 
        required: true 
    },

    email: { 
        type: String, 
        required: true 
    },

    password: { 
        type: String, 
        required: true
    },
    
    state: { 
        type: String, 
        required: true 
    },

    district: { 
        type: String, 
        required: true 
    },

    address: { 
        type: String, 
        required: true 
    },

    latitude: { 
        type: Number, 
        required: true 
    },

    longitude: { 
        type: Number, 
        required: true 
    },

    requests: [{
        requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
    }],
    donations: [{
        donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    }],
    stock: {
        'A+': { type: Number, default: 0 },
        'A-': { type: Number, default: 0 },
        'B+': { type: Number, default: 0 },
        'B-': { type: Number, default: 0 },
        'AB+': { type: Number, default: 0 },
        'AB-': { type: Number, default: 0 },
        'O+': { type: Number, default: 0 },
        'O-': { type: Number, default: 0 }
    }
});

// Create model for Blood Banks
module.exports = mongoose.model('BloodBank', bloodBankSchema);