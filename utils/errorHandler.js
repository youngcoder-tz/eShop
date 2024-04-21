export const errorHandler = (err) =>
	err.response && err.response.data && err.response.data.message
		? err.response.data.message
		: err.message;

export const displayError = (msg) => (
	<p>
		<em className="text-red-600">* {msg}</em>
	</p>
);
