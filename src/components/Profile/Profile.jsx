import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

// internal imports
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
	const { user } = useSelector(userSelector);
	const { data: favoriteMovies, refetch: refetchFavrotieMovies } = useGetListQuery({
		listName: 'favorite/movies',
		accountId: user.id,
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});
	const { data: watchlistMovies, refetch: refetchWatchlistMovies } = useGetListQuery({
		listName: 'watchlist/movies',
		accountId: user.id,
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});

	useEffect(() => {
		refetchFavrotieMovies();
		refetchWatchlistMovies();
	}, []);

	const logout = () => {
		localStorage.clear();

		window.location.href = '/';
	};
	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h4" gutterBottom>
					MY Profile
				</Typography>
				<Button color="inherit" onClick={logout}>
					Logout &nbsp; <ExitToApp />
				</Button>
			</Box>
			{!favoriteMovies?.results?.length && !watchlistMovies?.results?.lenghth ? (
				<Typography variant="h5">Add favourites or watchlist some movies.</Typography>
			) : (
				<Box>
					<RatedCards title="Favorite Movies" data={favoriteMovies} />
					<RatedCards title="watchlist" data={watchlistMovies} />
				</Box>
			)}
		</Box>
	);
};

export default Profile;
