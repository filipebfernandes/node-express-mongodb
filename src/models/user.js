import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

userSchema.statics.findByLogin = async login => {
  let user = await User.findOne({
    username: login
  });

  if (!user) {
    user = await User.findOne({
      email: login
    });
  }

  return user;
};

userSchema.pre("remove", next =>
  this.model("Message").deleteMany({ user: this._id }, next)
);

const User = mongoose.model("User", userSchema);

export default User;
