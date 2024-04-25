import React from 'react';
import Cookies from 'js-cookie';

export const Favorites = React.createContext();

// Action Types
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const RESET_FAVORITES = 'RESET_FAVORITES';

// Initial State
const initialState = {
	favorites: Cookies.get('favorites')
		? JSON.parse(Cookies.get('favorites'))
		: [],
};

// Reducer
const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_FAVORITES:
			const newItem = action.payload;
			const existingItem = state.favorites?.find(
				(favorite) => favorite?.slug === newItem.slug
			);

			const favoriteItems = existingItem
				? state.favorites.filter((item) => item.slug !== existingItem.slug)
				: [...state.favorites, newItem];

			Cookies.set('favorites', JSON.stringify(favoriteItems), {
				sameSite: 'Lax',
			});

			return {
				...state,
				favorites: favoriteItems,
			};
		case RESET_FAVORITES:
			Cookies.set('favorites', JSON.stringify({ favorites: [] }), {
				sameSite: 'Lax',
			});
			return {
				...state,
				favorites: [],
			};

		default:
			return state;
	}
};

export const FavoriteProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<Favorites.Provider value={{ state, dispatch }}>
			{children}
		</Favorites.Provider>
	);
};
