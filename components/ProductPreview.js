/**
 * External dependencies
 */
import Image from 'next/image';
import Link from 'next/link';
import { Rating, IconButton } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import { BsSuitHeart } from 'react-icons/bs';
import { addToCart, Store } from '../utils';
import { useContext } from 'react';

/**
 * Internal dependencies
 */
import Button from './Button';

export default ({ item, showPreview, setShowPreview }) => {
	const { state, dispatch } = useContext(Store);

	const {
		image,
		name,
		rating,
		numOfReviews,
		priceDisplay,
		priceDiscountedDisplay,
		description,
		category,
	} = item;

	return (
		<div className="product-preview">
			<div className="content">
				<div className="quicklook">
					<div className="quicklook-image">
						<Image src={image} width={500} height={500} alt={name} />
					</div>

					<div className="quicklook-summary">
						<div className="rating">
							<Rating readOnly value={rating} />

							<span className="count">({numOfReviews} customer review)</span>
						</div>

						<h2 className="title">{name}</h2>

						<p className="price">
							<span>${priceDisplay}</span>

							{priceDiscountedDisplay && (
								<span className="discount-amount">
									${priceDiscountedDisplay}
								</span>
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
								onClick={() => addToCart(item, state, dispatch)}
							>
								ADD TO CART
							</Button>

							<IconButton title="Add to favorite" className="favorite">
								<BsSuitHeart />
							</IconButton>
						</div>
					</div>

					<IconButton
						onClick={() => setShowPreview(false)}
						title="Close"
						className="close"
					>
						<GrClose />
					</IconButton>
				</div>
			</div>
		</div>
	);
};
