/**
 * External dependencies
 */
import Image from 'next/image';
// import Link from 'next/link';

/**
 * Internal dependencies
 */
import { useState } from 'react';
import { data } from '../utils';
// import db from '../utils/db';
import { Button, Footer, Header, ProductsList } from '../components';

function Home() {
	const [active, setActive] = useState(false);

	return (
		<>
			{/* Header */}
			<Header />

			{/* Hero */}
			<section className="max-w-container">
				<div className="hero">
					<div className="container">
						<div className="heading">
							<h3>Be Confident</h3>
							<h5>Wear Color</h5>

							<Button variant="link-button">ORDER NOW</Button>
						</div>

						<div className="images">
							<span className="back">
								<Image
									alt="Spray Back"
									src="/images/spray-back.png"
									width={260}
									height={550}
								/>
							</span>
							<span className="front">
								<Image
									src="/images/spray-front.png"
									alt="Spray front"
									width={1600}
									height={748}
								/>
							</span>
							<span className="ribbon">
								<Image
									alt="ribbon"
									src={'/images/ribbon.png'}
									width={1600}
									height={778}
								/>
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Featured */}
			<section className="max-w-container">
				<div className="featured">
					<div className="card-1">
						<span className="bg-overlay" />
						<span className="text">
							<h3 className="card-title">FEEL THE</h3>
							<h5 className="card-subtitle">DIFFERENCE</h5>

							<Button variant="link-button-dark">ORDER NOW</Button>
						</span>
					</div>
					<div className="card-2">
						<div className="necklace">
							<Image
								alt="Necklace"
								src="/images/necklace.jpg"
								width={300}
								height={300}
							/>
							<span className="text">
								<h3 className="card-title">Women's</h3>
								<h5 className="card-subtitle">Accessories</h5>

								<Button variant="outlined-btn">ORDER NOW</Button>
							</span>
						</div>
						<div className="watch">
							<span className="text">
								<h3 className="card-title">Men's</h3>
								<h5 className="card-subtitle">Accessories</h5>

								<Button variant="outlined-btn">ORDER NOW</Button>
							</span>
							<Image
								alt="Watch"
								src="/images/watch.jpg"
								width={300}
								height={300}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Products */}
			<section className="max-w-container products">
				<div className="heading">
					<h5>Find Your Beauty Match</h5>
					<p>AT VERO EOS ET ACCUSAMUS ET IUSTO</p>
				</div>

				<ProductsList products={data.productList.slice(0, 8)} />
			</section>

			{/* Testimonies */}
			<section className="max-w-container testimonies">
				<div className="heading">
					<h5>What The Customers Say</h5>
					<p>AT VERO EOS ET ACCUSAMUS ET IUSTO</p>
				</div>

				<div className="testimony-container">
					<div className="testimony">
						<p>
							There are many variations passages of Lorem Ipsum available, but
							the majority have suffered alteration in some form, by injected or
							randomised .
						</p>

						<div className="info-box">
							<Image src="/images/customer1.jpg" width={300} height={300} />

							<div className="info">
								<h4>KARLA LYNN</h4>
								<h5>MAKEUP ARTIST</h5>
								<span className="rating-box" />
							</div>
						</div>
					</div>

					<div className="testimony">
						<p>
							There are many variations passages of Lorem Ipsum available, but
							the majority have suffered alteration in some form, by injected or
							randomised .
						</p>

						<div className="info-box">
							<Image src="/images/customer2.jpg" width={300} height={300} />

							<div className="info">
								<h4>TOMAS CAMPBELL</h4>
								<h5>SERVICE TECHNICIAN</h5>
								<span className="rating-box" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Subscribe */}
			<section className="max-w-container">
				<div className="subscribe">
					<div className="container">
						<div className="heading">
							<h3>Subscribe Now</h3>
							<h5>Enjoy 25% Discount</h5>

							<input
								type="text"
								placeholder="Your email address"
								className="outlined-input"
							/>
							<Button variant="link-button">SUBMIT</Button>
						</div>

						<div className="image-container">
							<span className="front">
								<Image
									src="/images/model-sub.png"
									alt="Model"
									width={867}
									height={786}
								/>
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</>
	);
}

export default Home;
