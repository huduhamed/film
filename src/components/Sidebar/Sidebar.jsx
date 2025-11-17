// review useFffect hook or remove later
import { useEffect } from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	Divider,
	ListItemText,
	ListSubheader,
	Box,
	CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//internal imports
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const blueLogo = 'https://fontmeme.com/permalink/250228/0991b8c9865596562beba546572aab28.png';
const redLogo = 'https://fontmeme.com/permalink/250228/e66c4f5f6e7088308cce5c6adf693884.png';

const categories = [
	{
		label: 'Popular',
		value: 'popular',
	},
	{
		label: 'Top Rated',
		value: 'top_rated',
	},
	{
		label: 'Upcoming',
		value: 'upcoming',
	},
];

// sidebar comp TODO: fix props
const Sidebar = ({ setMobileOpen }) => {
	const theme = useTheme();
	const classes = useStyles();
	const { data, isFetching } = useGetGenresQuery();
	const dispatch = useDispatch();
	const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

	useEffect(() => {
		setMobileOpen(false);
	}, [genreIdOrCategoryName]);

	return (
		<>
			<Link to="/" className={classes.imageLink}>
				<img
					className={classes.image}
					src={theme.palette.mode === 'light' ? blueLogo : redLogo}
					alt="film logo"
				/>
			</Link>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<Link key={value} className={classes.links} to="/">
						<ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
							{
								<ListItemIcon>
									<img
										src={genreIcons[label.toLowerCase()]}
										height={30}
										className={classes.genreImage}
									/>
								</ListItemIcon>
							}
							<ListItemText primary={label} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Box display="flex" justifyContent="center">
						<CircularProgress />
					</Box>
				) : (
					data.genres.map(({ name, id }) => (
						<Link key={name} className={classes.links} to="/">
							<ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
								<ListItemIcon>
									<img
										src={genreIcons[name.toLowerCase()]}
										height={30}
										className={classes.genreImage}
									/>
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItem>
						</Link>
					))
				)}
			</List>
		</>
	);
};

export default Sidebar;
