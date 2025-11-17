import { Typography, Grid2, Tooltip, Grow, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// internal import
import useStyles from './styles';

// movie comp
const Movie = ({ movie, i }) => {
	const classess = useStyles();

	return (
		<Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} className={classess.movie}>
			<Grow in key={i} timeout={(i + 1) * 250}>
				<Link to={`/movie/${movie.id}`} className={classess.links}>
					{
						<img
							alt={movie.title}
							src={
								movie.poster_path
									? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
									: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
							}
							className={classess.image}
						/>
					}
					<Typography variant="h5" className={classess.title}>
						{movie.title}
					</Typography>
					<Tooltip title={`${movie.vote_average} / 10`} disableTouchListener>
						<div>
							<Rating readOnly value={movie.vote_average / 2} precision={0.1} />
						</div>
					</Tooltip>
				</Link>
			</Grow>
		</Grid2>
	);
};

export default Movie;
