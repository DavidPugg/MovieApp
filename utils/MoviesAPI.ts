import axios from 'axios';
import { Movie, Tv } from '~/interfaces/Movie';
import { ApiResponse } from '~/interfaces/Response';

export const fetchMovies = async ({ type, page, query }: { type?: String; page?: String; query?: String }) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${query || 'popular'}?api_key=${process.env.apiKey}&language=en-US&page=${
            page || 1
        }`,
    );
    return data;
};

export const fetchMovie = async ({ type, id }: { type: String; id: String }) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};

export const fetchMovieVideos = async ({ type, id }: { type: String; id: String }) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};

export const fetchMovieCredits = async ({ type, id }: { type: String; id: String }) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};

export const fetchSearchResults = async (page: String, query: String, type: String) => {
    const { data } = await axios.get<ApiResponse<Movie | Tv>>(
        `https://api.themoviedb.org/3/search/${type || 'movie'}?api_key=${
            process.env.apiKey
        }&language=en-US&page=${page}&query=${query}`,
    );
    return data;
};
