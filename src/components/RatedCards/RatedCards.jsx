import { Box, Typography } from '@mui/material';

// internal imports
import useStyles from './styles';
import { Movie } from '..';

// rated cards component
const RatedCards = ({ title, data }) => {
	const classes = useStyles();

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				{title}
			</Typography>
			<Box display="flex" flexWrap="wrap" className={classes.contianer}>
				{data?.results.map((movie, i) => (
					<Movie key={movie.id} movie={movie} i={i} />
				))}
			</Box>
		</Box>
	);
};

export default RatedCards;
