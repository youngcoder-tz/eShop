/**
 * External dependencies
 */
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { FaPlus, FaRegEye, FaRegHeart } from 'react-icons/fa';

/**
 * Internal dependencies
 */
import Button from './Button';
import ProductPreview from './ProductPreview';

export default ({ products = [] }) => {
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
									<Button
										onClick={() => {
											setShowPreview(true);
											setCurrentItem(item);
										}}
										title="Preview"
										className="preview"
									>
										<FaRegEye />
									</Button>

									<Button title="Add to Favorites" className="favorite">
										<FaRegHeart />
									</Button>

									<Button title="Add to Cart" className="cart">
										<FaPlus />
									</Button>
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
