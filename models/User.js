const mongoose = require("mongoose");

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// ------- User Model -------

// Create schema for Users
const userSchema = new mongoose.Schema({
    name:{ 
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
    email: { 
        type: String 
    },
    phone: { 
        type: Number, 
        unique: true, 
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
        type: String 
    },
});

// Create model for Users
module.exports = mongoose.model('User', userSchema);

