import axios from 'axios';

export const fetchPerson = async (actorId: String) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};
export const fetchPersonMovieCredits = async (actorId: String) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};
export const fetchPersonTvCredits = async (actorId: String) => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${process.env.apiKey}&language=en-US`,
    );
    return data;
};
