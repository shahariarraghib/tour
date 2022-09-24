const mongoose = require("mongoose");

// schema design
const tourPackageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name."],
      trim: true,
      unique: [true, "name must be unique"],
      minLength: [3, "name must be at list 3 characters."],
      maxLength: [100, "name is to long"],
    },
    description: {
      type: String,
      required: [true, "please provide a description for this package."],
    },
    price: {
      type: Number,
      required: [true, "please provide a price for this package."],
      min: [0, "price can't be negative."],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Price must be an integer",
    },
    imageUrl: {
      type: String,
      required: [true, "please provide a image url."],
    },
    ViewCount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackage;
