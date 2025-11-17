// import RTK for query mapping
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

export const tmdbApi = createApi({
	reducerPath: 'tmdbApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.themoviedb.org/3/',
	}),
	endpoints: (builder) => ({
		getGenres: builder.query({
			query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
		}),

		// Get movies by type
		getMovies: builder.query({
			query: ({ genreIdOrCategoryName, page, searchQuery }) => {
				// get movies by category
				if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
					return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
				}
				// get movies by genre
				if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
					return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
				}
				// get movie by search
				if (searchQuery) {
					return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
				}

				return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
			},
		}),
		// get movie
		getMovie: builder.query({
			query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
		}),

		// Get user specific list
		getList: builder.query({
			query: ({ listName, accountId, sessionId, page }) =>
				`/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
		}),
		getRecommendations: builder.query({
			query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
		}),

		// Get actor's details
		getActorsInfo: builder.query({
			query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
		}),

		// Get movies by actor
		getMoviesByActorId: builder.query({
			query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
		}),
	}),
});

// export movies queries as hooks
export const {
	useGetGenresQuery,
	useGetMoviesQuery,
	useGetMovieQuery,
	useGetRecommendationsQuery,
	useGetActorsInfoQuery,
	useGetMoviesByActorIdQuery,
	useGetListQuery,
} = tmdbApi;
