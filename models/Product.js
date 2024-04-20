import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String },
		slug: { type: String, required: true, unique: true },
		category: { type: [String], required: true },
		image: { type: String, required: true },
		discount: { type: String },
		priceDisplay: { type: String, required: true },
		priceDiscountedDisplay: { type: String },
		priceDiscounted: { type: Number },
		price: { type: Number, required: true },
		rating: { type: Number, default: 0 },
		countInStock: { type: Number, required: true, default: 0 },
		numOfReviews: { type: Number, required: true, default: 0 },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
