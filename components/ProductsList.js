/**
 * External dependencies
 */
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState, useContext } from 'react';
import { FaPlus, FaRegEye, FaRegHeart } from 'react-icons/fa';
import { IconButton } from '@mui/material';

/**
 * Internal dependencies
 */
import ProductPreview from './ProductPreview';
import { addToCart, Store } from '../utils';

export default ({ products = [] }) => {
	const { state, dispatch } = useContext(Store);
	const [showPreview, setShowPreview] = useState(false);
	const [currentItem, setCurrentItem] = useState({});

	return (
		<>
			<div id="products-list" className="products-list">
				{products.map((item, index) => {
					const {
						image,
						discount,
						name,
						slug,
						priceDisplay,
						priceDiscountedDisplay,
						category,
					} = item;

					return (
						<div key={index} className="product">
							<div className="product-img-preview">
								<Link href={`/product/${slug}`} className="img-container">
									<Image src={image} width={315} height={325} alt={name} />

									{discount && (
										<span className="discount-percent">
											<span>{discount}</span>
										</span>
									)}
								</Link>

								<div className="actions">
									<IconButton
										onClick={() => {
											setShowPreview(true);
											setCurrentItem(item);
										}}
										title="Preview"
										className="preview"
									>
										<FaRegEye />
									</IconButton>

									<IconButton title="Add to Favorites" className="favorite">
										<FaRegHeart />
									</IconButton>

									<IconButton
										title="Add to Cart"
										className="cart"
										onClick={() => addToCart(item, state, dispatch)}
									>
										<FaPlus />
									</IconButton>
								</div>
							</div>

							<div className="main">
								<Link href={`/product/${slug}`} className="name">
									<h3>{name}</h3>
								</Link>

								<span className="categories">
									{category.map((categoryItem, i) => {
										const isLast = i === category.length - 1;

										return (
											<Fragment key={categoryItem}>
												<Link href={`/shop?category=${categoryItem}`}>
													{categoryItem}
												</Link>
												{!isLast && ', '}
											</Fragment>
										);
									})}
								</span>

								<div className="price-container">
									<span className="price">${priceDisplay}</span>
									{priceDiscountedDisplay && (
										<span className="discount-price">
											{priceDiscountedDisplay}
										</span>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{showPreview && (
				<ProductPreview
					item={currentItem}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
				/>
			)}
		</>
	);
};
