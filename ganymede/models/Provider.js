import mongoose, {Schema} from 'mongoose';

const ProviderSchema = new Schema({
  name: {type: String},
  options: {type: Object},
});

export default mongoose.model('Provider', ProviderSchema);
