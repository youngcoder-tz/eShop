/**
 * External dependencies
 */
import { useContext } from 'react';
import Image from 'next/image';
import { BsSuitHeart } from 'react-icons/bs';
import { IconButton, Rating } from '@mui/material';
import Link from 'next/link';

/**
 * Internal dependencies
 */
import Product from '../../models/Product';
import { ProductHeader, Button, ProductsList, Layout } from '../../components';
import { addToCart, db, Store } from '../../utils';

export default function ProductScreen({ products, product }) {
	const { state, dispatch } = useContext(Store);
	const {
		name,
		image,
		rating,
		numOfReviews,
		priceDiscountedDisplay,
		priceDisplay,
		description,
		category,
		discount,
	} = product;

	if (!product) {
		return (
			<Layout title={'NOT FOUND'}>
				<ProductHeader title={'PRODUCT NOT FOUND'} />
			</Layout>
		);
	}

	return (
		<Layout title={product?.name}>
			<ProductHeader
				title={name}
				links={[
					{ name: 'Home', href: '/' },
					{ name: 'Prodcuts', href: '/shop' },
					{ name },
				]}
			/>

			<div className="slug-content">
				<div className="quicklook-image">
					<Image src={image} width={500} height={500} alt={name} />
				</div>

				<div className="quicklook-summary">
					{discount && <p className="discount-percent">{discount}</p>}

					<h2 className="title">{name}</h2>

					<div className="rating">
						<Rating readOnly value={rating} />

						<span className="count">({numOfReviews} customer review)</span>
					</div>

					<p className="price">
						<span>${priceDisplay}</span>

						{priceDiscountedDisplay && (
							<span className="discount-amount">${priceDiscountedDisplay}</span>
						)}
					</p>

					<p className="description">{description}</p>

					<div className="categories">
						<h6>Categories</h6>
						<span className="terms">
							{category.map((item, index) => (
								<>
									<Link
										href={`/shop?category=${item}`}
										onClick={() => setShowPreview(false)}
									>
										{item}
									</Link>
									{index < category.length - 1 && ', '}
								</>
							))}
						</span>
					</div>

					<div className="actions">
						<Button
							className="add-to-cart"
							variant="outlined-btn"
							onClick={() => addToCart(product, state, dispatch)}
						>
							ADD TO CART
						</Button>

						<IconButton title="Add to favorite" className="favorite">
							<BsSuitHeart />
						</IconButton>
					</div>
				</div>
			</div>

			<div className="product-description">
				<h4 className="text-heading">Find Your Beauty Match</h4>

				<p className="text1">
					Hills Science Plan Healthy Development Puppy Food Large Breed with
					Chicken is specifically formulated to meet the nutritional needs of
					your large breed puppy to help support its growth and development.
				</p>

				<p className="text2">
					Made from high quality ingredients including a minimum of 34% chicken,
					Hills Science Plan Canine Puppy Large Breed is infused with:
				</p>

				<ul className="text3">
					<li>
						Controlled Fat and Calories – to help large breed puppies grow at
						the proper rate;
					</li>
					<li>Controlled Calcium – for healthy joint and bone development;</li>
					<li>
						L-carnitine – a special nutrient shown to enhance bone and muscle
						strength;
					</li>
					<li>
						High Quality Protein – to support healthy growth and strong muscles;
					</li>
					<li>
						Minerals – provides the optimum amount for growth and development;
					</li>
					<li>With added calcium to help keep bones and teeth strong;</li>
					<li>Natural Fibre – for a healthy digestive system;</li>
					<li>Omega 3 and 6 Fatty Acids – for a shiny, healthy coat;</li>
					<li>
						Anti-oxidants – boosts your puppys immune system, reduces cell
						damage and aids growth.
					</li>
				</ul>

				<ul className="text4">
					<p>
						The crunchy kibble will help aid your puppys dental health through
						the natural crunching process, promoting dental care from a young
						age.
					</p>
					<li>
						Suitable for puppies from weaning up to 1 year old whose adult body
						weight will exceed 25kg.
					</li>
					<li>
						Hills Science Plan Canine Puppy Large Breed is part of the Pets at
						Home Nutrition Centre.
					</li>
					<li>Approximate Dimensions (Product): 42 x 15 x 20cm</li>
				</ul>
			</div>

			<section className="related-products">
				<h3>Related Products</h3>

				<ProductsList products={products.slice(0, 4)} />
			</section>
		</Layout>
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
