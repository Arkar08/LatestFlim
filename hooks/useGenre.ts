import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjQ5ODZhYTE5ZDUzNTg3NDQ5ZDhiODBiODU1YjFjNyIsIm5iZiI6MTcyNjIyMzYzNy40MjksInN1YiI6IjY2ZTQxNTE1ZjQ2N2MyYWQ2MmY5NzdkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.19NVhgz2WoxtSETp-WEkKlolPAhKDB0tVehS9DpZ1wY";

const getGenre = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    },
  );
  return data;
};

export const useGenre = () => {
  const queryGenre = useQuery({
    queryKey: ["genre"],
    queryFn: getGenre,
  });

  return { queryGenre };
};
