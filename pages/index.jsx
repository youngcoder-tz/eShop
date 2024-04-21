/**
 * External dependencies
 */
import Image from 'next/image';
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { icons, db } from '../utils';
import Product from '../models/Product';
import { ProductsList, Layout, Subscribe } from '../components';

export default function Home({ products }) {
	return (
		<Layout title={'HOME'}>
			{/* Hero */}
			<section className="hero">
				<div className="container">
					<div className="heading">
						<h3>Be Confident</h3>
						<h5>Wear Color</h5>

						<Link href={'/product/micellar-water-2'} className="link-button">
							ORDER NOW
							{icons.arrowLight}
						</Link>
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
								src={'/images/ribbon2.png'}
								width={1362}
								height={770}
							/>
						</span>
					</div>
				</div>
			</section>

			{/* Featured */}
			<section className="featured">
				<div className="card-1">
					<span className="bg-overlay" />
					<span className="text">
						<h3 className="card-title">FEEL THE</h3>
						<h5 className="card-subtitle">DIFFERENCE</h5>

						<Link href="/product/skin-primer-1" className="link-button-dark">
							ORDER NOW
							{icons.arrowDark}
						</Link>
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

							<Link href="/product/elegante-necklace" className="outlined-btn">
								ORDER NOW
							</Link>
						</span>
					</div>
					<div className="watch">
						<span className="text">
							<h3 className="card-title">Men's</h3>
							<h5 className="card-subtitle">Accessories</h5>

							<Link href="/product/elegante-watch" className="outlined-btn">
								ORDER NOW
							</Link>
						</span>
						<Image
							alt="Watch"
							src="/images/watch.jpg"
							width={300}
							height={300}
						/>
					</div>
				</div>
			</section>

			{/* Products */}
			<section>
				<div className="heading">
					<h5>Find Your Beauty Match</h5>
					<p>AT VERO EOS ET ACCUSAMUS ET IUSTO</p>
				</div>

				<ProductsList products={products.slice(0, 8)} />
			</section>

			{/* Testimonies */}
			<section className="testimonies">
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
							<Image
								alt="customer image"
								src="/images/customer1.jpg"
								width={300}
								height={300}
							/>

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
							<Image
								alt="customer image"
								src="/images/customer2.jpg"
								width={300}
								height={300}
							/>

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
			<Subscribe />
		</Layout>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();

	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
