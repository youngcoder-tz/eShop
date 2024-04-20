import User from '../../models/User';
import { db, data } from '../../utils';
import Product from '../../models/Product';

export default async function handler(req, res) {
	await db.connect();

	await User.deleteMany();
	await User.insertMany(data.users);

	await Product.deleteMany();
	await Product.insertMany(data.productList);

	await db.disconnect();

	res.send({ message: 'seeded successfully' });
}
