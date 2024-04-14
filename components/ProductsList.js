/**
 * External dependencies
 */
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { FaPlus, FaRegEye, FaRegHeart } from 'react-icons/fa';

/**
 * Internal dependencies
 */
import Button from './Button';

export default ({ products = [] }) => {
	return (
		<div className="products-list">
			{products.map((item) => {
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
					<div key={slug} className="product">
						<Link href="#" className="img-container">
							<Image src={image} width={315} height={325} alt={name} />

							{discount && (
								<span className="discount-percent">
									<span>{discount}</span>
								</span>
							)}

							<div className="actions">
								<Button title="Preview" className="preview">
									<FaRegEye />
								</Button>

								<Button title="Add to Favorites" className="favorite">
									<FaRegHeart />
								</Button>

								<Button title="Add to Cart" className="cart">
									<FaPlus />
								</Button>
							</div>
						</Link>
						<div className="main">
							<Link href="#" className="name">
								<h3>{name}</h3>
							</Link>

							<span className="categories">
								{category.map((categoryItem, i) => {
									const isLast = i === category.length - 1;

									return (
										<Fragment key={i}>
											<Link href="#">{categoryItem}</Link>
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
	);
};
