import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { addToCart } from '../../utils/addToCart';
import { motion } from 'framer-motion';
import { BsSuitHeart, BsShare } from 'react-icons/bs';

/**
 * External dependencies
 */
import { SlArrowRight } from 'react-icons/sl';

/**
 * Internal dependencies
 */
import { ProductHeader } from '../../components';

export default function ProductScreen({ products, product }) {
	const { state, dispatch } = useContext(Store);
	const { name } = product;

	if (!product) {
		return (
			<Layout title={'NOT FOUND'}>
				<h1 className="text-2xl min-h-[50vh] flex items-center justify-center">
					Product Not Found
				</h1>
			</Layout>
		);
	}

	return (
		<>
			<Layout title={product.name}>
				<ProductHeader title={name}>
					<SlArrowRight className="arrow" />
					<span className="text-[#D10D43]">{name}</span>
				</ProductHeader>
			</Layout>
		</>
	);
}

export async function getServerSideProps(context) {
	const { slug } = context.params;

	await db.connect();
	const products = await Product.find().lean();
	const product = await Product.findOne({ slug }).lean();

	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
			products: products.map(db.convertDocToObj),
		},
	};
}
