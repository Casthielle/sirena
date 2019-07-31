import mongoose, {Schema} from 'mongoose';

const ProductSchema = new Schema({
  sku: {type: String},
  product_name: {type: String},
  price: {type: Number},
  original_price: {type: Number},
  product_category_id: {type: String},
  description: {type: String},
  images: {type: [String]},
  related_search_queries: {type: String},
});

export default mongoose.model('Product', ProductSchema);
