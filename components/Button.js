export default ({ variant = '', className = '', children, ...rest }) => {
	className = `${className} ${variant}`;

	return (
		<button {...rest} className={className}>
			{children}
		</button>
	);
};
