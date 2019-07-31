import mongoose, {Schema} from 'mongoose';

const SearchOrderSchema = new Schema({
  search_data: {type: Object},
  status: {type: String},
  search_results: {type: Array},
});

export default mongoose.model('SearchOrder', SearchOrderSchema);
