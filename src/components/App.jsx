import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// internal components
import { Actors, MovieInformation, Movies, Profile, NavBar } from './';
import useStyles from './styles';

// app comp
const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Routes>
					<Route path="/" exact element={<Movies />} />
					<Route path="/approved" exact element={<Movies />} />
					<Route path="/movie/:id" exact element={<MovieInformation />} />
					<Route path="/actors/:id" exact element={<Actors />} />
					<Route path="/profile/:id" exact element={<Profile />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
