import { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

// internal imports
import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';

// define movies comp
const Movies = () => {
	const [page, setPage] = useState(1);
	const { genreIdOrCategoryName, searchQuery } = useSelector(
		(state) => state.currentGenreOrCategory
	);
	const { data, isFetching, error } = useGetMoviesQuery({
		genreIdOrCategoryName,
		page,
		searchQuery,
	});
	const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

	const numberOfMovies = lg ? 17 : 19;

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress size="4rem" />
			</Box>
		);
	}

	if (!data.results.length) {
		return (
			<Box display="flex" alignItems="center" mt="20px">
				<Typography variant="4">
					No movies found <br /> Try again.
				</Typography>
			</Box>
		);
	}

	if (error) return 'Unfortunately an error occured.';
	return (
		<div>
			<FeaturedMovie movie={data.results[0]} />
			<MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
			<Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
		</div>
	);
};

export default Movies;
