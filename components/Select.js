/**
 * External dependencies
 */
import { useState, useRef, useEffect } from 'react';
import { SlArrowDown } from 'react-icons/sl';

/**
 * Internal dependencies
 */
import { Button } from '.';

export default ({ value, options = [], onChange = () => {} }) => {
	const [showMenu, setShowMenu] = useState(false);
	const selectRef = useRef();

	const handleToggle = () => {
		setShowMenu((prev) => !prev);
	};

	const handleChangle = (item) => {
		onChange(item);
		setShowMenu(false);
	};

	useEffect(() => {
		const handleClickOutside = ({ target }) => {
			if (target && selectRef.current && !selectRef.current.contains(target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<span className="relative" ref={selectRef}>
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
