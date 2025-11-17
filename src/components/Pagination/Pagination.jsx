import { Typography, Button } from '@mui/material';

// internal imports
import useStyes from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
	const classes = useStyes();

	if (totalPages === 0) return null;

	const handlePrev = () => {
		if (currentPage != 1) {
			setPage((prevPage) => prevPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage != totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	return (
		<div className={classes.container}>
			<Button
				onClick={handlePrev}
				className={classes.button}
				variant="contained"
				type="button"
				color="primary"
			>
				Prev
			</Button>
			<Typography className={classes.pageNumber} variant="h4">
				{currentPage}
			</Typography>
			<Button
				onClick={handleNext}
				className={classes.button}
				variant="contained"
				type="button"
				color="primary"
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
