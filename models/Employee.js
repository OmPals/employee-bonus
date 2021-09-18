const mongoose = require('mongoose')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let Employee = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        length: 10,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    uniqueId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    monthlySalary: {
        type: Number,
        required: true
    },
}, { timestamps: true, toObject: { virtuals: true },
toJSON: { virtuals: true }, versionKey: false })

Employee.virtual('bonus').get(function() {
    const sal = this.monthlySalary
    if(sal <= 10000) {
        return sal*7.5/100
    }
    else if(sal > 10000 && sal <= 20000) {
        return sal*15/100
    }
    else {
        return sal*18/100
    }
});

module.exports = mongoose.model('Employee', Employee)