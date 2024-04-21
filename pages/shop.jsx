/**
 * External dependencies
 */
import { SlArrowRight } from 'react-icons/sl';
import { Box, Slider } from '@mui/material';
import { useState } from 'react';
import { db } from '../utils';
import Product from '../models/Product';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Internal dependencies
 */
import {
	Button,
	Select,
	Subscribe,
	ProductsList,
	ProductHeader,
	Layout,
} from '../components';

export default function Home({
	products,
	countProducts,
	categories,
	pages,
	maxPrice,
	minPrice,
}) {
	const router = useRouter();
	const { page = 1, sort } = router.query;
	const [selectedPrice, setSelectedPrice] = useState([minPrice, maxPrice]);

	const selectOptions = [
		{ name: 'Low to High', value: 'lowest' },
		{ name: 'High to Low', value: 'highest' },
	];

	const handlePriceChange = (event, newValue) => {
		setSelectedPrice(newValue);
	};

	const filterSearch = ({
		page,
		category,
		brand,
		sort,
		searchQuery,
		price,
		rating,
		min,
		max,
	}) => {
		const { query } = router;
		if (page) query.page = page;
		if (searchQuery) query.searchQuery = searchQuery;
		if (sort) query.sort = sort;
		if (category) query.category = category;
		if (brand) query.brand = brand;
		if (price) query.price = price;
		if (rating) query.rating = rating;
		if (min) query.min = min;
		if (max) query.max = max;

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	const categoryHandler = (category) => {
		filterSearch({ category });
	};
	const pageHandler = (page) => {
		filterSearch({ page });
	};
	const priceHandler = (min, max) => {
		filterSearch({ min, max });
	};
	const sortHandler = (value) => {
		filterSearch({ sort: value });
	};

	return (
		<Layout title="SHOP">
			<ProductHeader title={'Products'} />

			<div className="sort-results">
				<Select
					text={`SORT BY: ${
						sort
							? selectOptions.find((option) => option.value === sort).name
							: 'DEFAULT'
					}`}
					options={selectOptions}
					onChange={sortHandler}
				/>

				<p className="results">
					{countProducts
						? `SHOWING ALL ${countProducts} RESULTS`
						: 'No products to show'}
				</p>
			</div>

			<aside className="filters">
				<section className="categories">
					<h3>Shop by category</h3>

					<ul>
						{categories.map((category) => (
							<li>
								<button onClick={() => categoryHandler(category)}>
									{category}
								</button>
							</li>
						))}
					</ul>
				</section>
				<section className="prices">
					<h3>Price Filter</h3>

					<div>
						<h6>SELECT</h6>

						<Box sx={{ width: 230 }}>
							<Slider
								min={minPrice}
								max={maxPrice}
								getAriaLabel={() => 'Price range'}
								value={selectedPrice}
								onChange={handlePriceChange}
								valueLabelDisplay="auto"
								marks={[
									{
										value: minPrice,
										label: '$' + minPrice,
									},
									{
										value: maxPrice,
										label: '$' + maxPrice,
									},
								]}
							/>
						</Box>

						<Button
							variant="outlined-btn"
							onClick={() => priceHandler(selectedPrice[0], selectedPrice[1])}
						>
							FILTER
						</Button>
					</div>
				</section>
			</aside>

			<ProductsList products={products} />
			<ul className="paginate">
				{products.length > 0 &&
					[...Array(pages).keys()].map((pageNumber) => (
						<li key={pageNumber}>
							<button
								className={page == pageNumber + 1 ? 'active' : ''}
								onClick={() => pageHandler(pageNumber + 1)}
							>
								{pageNumber + 1}
							</button>
						</li>
					))}
			</ul>

			<Subscribe />
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const pageSize = query.pageSize || 16;
	const page = query.page || 1;
	const category = query.category || '';
	const sort = query.sort || 'highest';
	const searchQuery = query.query || '';
	const min = query.min || 0;
	const max = query.max || Infinity;

	// Search query filter
	const queryFilter =
		searchQuery && searchQuery !== 'all'
			? {
					name: {
						$regex: searchQuery,
						$options: 'i',
					},
			  }
			: {};

	// Category filter
	const categoryFilter = category && category !== 'all' ? { category } : {};

	// Order filter
	const orderFilter =
		sort === 'featured'
			? { isFeatured: -1 }
			: sort === 'lowest'
			? { price: 1 }
			: sort === 'highest'
			? { price: -1 }
			: sort === 'toprated'
			? { rating: -1 }
			: sort === 'newest'
			? { createdAt: -1 }
			: { _id: -1 };

	await db.connect();

	// Price filter
	const priceFilter = {
		price: {
			$gte: min,
			$lte: max,
		},
	};

	const categories = await Product.find()?.distinct('category');
	const productDocs = await Product.find({
		...queryFilter,
		...categoryFilter,
		...priceFilter,
	})
		.sort(orderFilter)
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.lean();

	const countProducts = await Product.countDocuments({
		...queryFilter,
		...categoryFilter,
		...priceFilter,
	});

	const minPrice = await Product.findOne({}).sort({ price: 1 });
	const maxPrice = await Product.findOne({}).sort({ price: -1 });

	const products = productDocs.map(db.convertDocToObj);

	return {
		props: {
			products,
			countProducts,
			page,
			pages: Math.ceil(countProducts / pageSize),
			categories,
			minPrice: minPrice?.price || 0,
			maxPrice: maxPrice?.price || 60000,
		},
	};
}
