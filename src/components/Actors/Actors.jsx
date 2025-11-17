import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Box, Grid2, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

// internal imports
import { useGetActorsInfoQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

// actors page
const Actors = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);

	const { data, isFetching, error } = useGetActorsInfoQuery(id);
	const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
	const classes = useStyles();

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<CircularProgress size="8rem" />
			</Box>
		);
	}

	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<Button startIcon={<ArrowBack />} color="primary" onClick={() => navigate.goBack()}>
					Go back
				</Button>
			</Box>
		);
	}

	return (
		<>
			<Grid2 container spacing={3}>
				<Grid2 item lg={5} xl={4}>
					<img
						className={classes.image}
						src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
						alt={data.name}
					/>
				</Grid2>
				<Grid2
					item
					lg={7}
					xl={8}
					style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
				>
					<Typography variant="h2" gutterBottom>
						{data?.name}
					</Typography>
					<Typography variant="h5" gutterBottom>
						Born: {new Date(data?.birthday).toDateString()}
					</Typography>
					<Typography variant="body1" align="justify">
						{data?.biography || 'Awww Sorry, no biography.'}
					</Typography>
					<Box display="flex" justifyContent="space-around" marginTop="2rem">
						<Button
							color="primary"
							target="_blank"
							variant="contained"
							href={`https://www.imdb.com/name/${data?.imdb_id}`}
						>
							IMDB
						</Button>
						<Button color="primary" startIcon={<ArrowBack />} onClick={() => navigate.goBack()}>
							Back
						</Button>
					</Box>
				</Grid2>
			</Grid2>
			<Box margin="2rem 0">
				<Typography variant="h2" align="center" gutterBottom>
					Movies
					{movies && <MovieList movies={movies} numberOfMovies={12} />}
					<Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
				</Typography>
			</Box>
		</>
	);
};

export default Actors;
