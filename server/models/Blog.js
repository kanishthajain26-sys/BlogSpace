
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Technology",
                "Education",
                "Lifestyle",
                "Travel",
                "Programming",
                "Other"
            ]
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Blog", blogSchema);
