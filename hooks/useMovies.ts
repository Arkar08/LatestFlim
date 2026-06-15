import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjQ5ODZhYTE5ZDUzNTg3NDQ5ZDhiODBiODU1YjFjNyIsIm5iZiI6MTcyNjIyMzYzNy40MjksInN1YiI6IjY2ZTQxNTE1ZjQ2N2MyYWQ2MmY5NzdkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.19NVhgz2WoxtSETp-WEkKlolPAhKDB0tVehS9DpZ1wY";

const getNowPlayingMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return res.data;
};

const getPopularMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return res.data;
};

const getTopMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return res.data;
};

const getComingMovie = async () => {
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return res.data;
};

const fetchMovieById = async (id: string | number) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return data;
};

const searchMovie = async (text: string) => {
  if (!text.trim()) return { results: [] };
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(text)}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return data;
};

const postTrailer = async (id: string | number) => {
  if (!id) return { data: [] };

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return data;
};

export const useMovie = () => {
  const queryClient = useQueryClient();
  const queryMovie = useQuery({
    queryKey: ["nowPlayingMovie"],
    queryFn: getNowPlayingMovie,
  });

  const popularMovie = useQuery({
    queryKey: ["Popular"],
    queryFn: getPopularMovie,
  });

  const topMovie = useQuery({
    queryKey: ["TopRated"],
    queryFn: getTopMovie,
  });

  const comingMovie = useQuery({
    queryKey: ["Comming"],
    queryFn: getComingMovie,
  });

  const toggleTrailer = useMutation({
    mutationFn: async (id: string | number) => {
      return await postTrailer(id);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["CarouselMovie"], data);
    },
  });

  return {
    queryMovie,
    popularMovie,
    topMovie,
    comingMovie,
    toggleTrailer: toggleTrailer.mutateAsync,
  };
};

export const useMovieById = (id: string | number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
  });
};

export const useSearch = (text: string) => {
  return useQuery({
    queryKey: ["searchMovie", text],
    queryFn: () => searchMovie(text),
    enabled: text.trim().length > 0,
  });
};
