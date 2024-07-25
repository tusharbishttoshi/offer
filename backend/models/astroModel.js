const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const astroSchema = new mongoose.Schema({
    name: String,
    email: String,
    panNumber: String,
    adhara: String,
    passport: String,
    password: String,
    number: Number,
    country: String,
    address: String,
    gender: String,
    isOnline: {
        type: String,
        default: "Offline"
    },
    dob: String,
    spirituality: [],
    accountNumber: String,
    ifscCode: String,
    accountName: String,
    bankName: String,
    status: {
        type: String,
      enum: ['pending', 'rejected', 'verified'],
      default: 'pending',
    },
    otp: {
        type: String, default: ""
    },
    reviews: [
        {
            rating: Number,
            comment: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    avatar: {
        url: String,
        public_id: String
    },
    image: {
        url: String,
        public_id: String
    },
    idProof: {
        url: String,
        public_id: String
    },
    balance: {
        type: Number,
        default: 0
    },
    chargePrise: {
        type:Number,
        default:2.51
    },
    earnPrise:  {
        type:Number,
        default:0.77
    },
    experience: Number,
    consultation: {
        type: Number,
        default: 0,
    },
    category: [],
    bio: String,
    languages: [],
    howDidYouHear: {
        type: String, default: ""
    },
    techSkills: {
        type: String, default: ""
    }, commitment: {
        type: String, default: ""
    }, readingStyle: {
        type: String, default: ""
    }, socialMediaLink: {
        type: String, default: ""
    }, platform: {
        type: String, default: ""
    }, educationLevel: {
        type: String, default: ""
    }, trainingsCertifications: {
        type: String, default: ""
    }, psychicAbilities: {
        type: String, default: ""
    }, discoverYourAbility: {
        type: String, default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
astroSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

astroSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

astroSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("Astro", astroSchema);
