import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

UserSchema.methods.encrypt = async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

UserSchema.methods.match = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
