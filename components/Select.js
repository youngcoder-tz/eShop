/**
 * External dependencies
 */
import { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';

/**
 * Internal dependencies
 */
import { Button } from '.';

export default ({ value, options = [], onChange = () => {} }) => {
	const [showMenu, setShowMenu] = useState(false);

	const handleToggle = () => {
		setShowMenu((prev) => !prev);
	};

	const handleChangle = (item) => {
		onChange(item);
		setShowMenu(false);
	};

	return (
		<span className="relative">
			<Button
				variant="select"
				onClick={handleToggle}
				className={showMenu ? 'is-active' : ''}
			>
				{value}
				<SlArrowDown className="inline ml-4 text-[13px] mb-[0.15rem]" />
			</Button>

			<ul>
				{options.map(({ value, name }, index) => (
					<li key={index} onClick={() => handleChangle(value)}>
						{name}
					</li>
				))}
			</ul>
		</span>
	);
};
