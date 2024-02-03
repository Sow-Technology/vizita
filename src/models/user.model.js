import mongoose, { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      lowercase: true,
      trim: true,
      index: true,
    },
    personalEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    // professionalEmail: {
    //   type: String,
    //   // unique: [true, "Email already exists"],
    //   lowercase: true,
    //   trim: true,
    // },
    companyName: {
      type: String,
    },
    designation: {
      type: String,
    },

    fullname: {
      type: String,
      // required: [true, "Full name is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    avatar: {
      type: String,
      // required: [true, "Avatar is required!"],
    },
    socialMedia: {
      facebook: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      others: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    website: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
const User = mongoose.models.User || model("User", userSchema);

export default User;
