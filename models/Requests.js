const mongoose = require("mongoose");

// ------- Requests Model -------

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Create schema for Patients
const bloodRequests = new mongoose.Schema({
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
    name: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    bloodGroup: { 
        type: String, 
        enum: bloodGroups, 
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
    reason: { 
        type: String 
    },
    status: { type: String, 
              enum: ['Pending', 'Approved', 'Denied', 'Completed'], 
              default: 'Pending'
            }
});

// Create model for Patients
module.exports = mongoose.model('Requests', bloodRequests);