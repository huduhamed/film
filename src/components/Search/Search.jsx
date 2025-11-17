import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { useDispatch } from 'react-redux';

// internal imports
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';
import { useLocation } from 'react-router-dom';

// search comp
const Search = () => {
	const [query, setQuery] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			dispatch(searchMovie(query));
		}
	};

	if (location.pathname != '/') return null;

	return (
		<div className={classes.searchContainer}>
			<TextField
				onKeyDown={handleKeyDown}
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				variant="standard"
				slotProps={{
					input: {
						className: classes.input,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					},
				}}
			/>
		</div>
	);
};

export default Search;
